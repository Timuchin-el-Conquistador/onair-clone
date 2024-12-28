"use client";
import React, { useMemo, useState } from "react";
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";

import {
  type StripeCardNumberElementChangeEvent,
  type StripeCardCvcElementChangeEvent,
  type StripeCardExpiryElementChangeEvent,
  type Stripe,
  type StripeElements,
  type PaymentMethod,
  type PaymentMethodResult,
} from "@stripe/stripe-js";

import "@/styles/stripe.scss";

import SubmitBtn from "@/components/Buttons/submit";
import Danger from "@/components/Alerts/danger";
import Success from "@/components/Alerts/success";
import Spinner from "@/components/Loaders/spinner";
import Info from "@/components/Alerts/info";

const useOptions = () => {
  const options = useMemo(
    () => ({
      showIcon: true,
      style: {
        base: {
          fontSize: "17px",
          color: "#424770",

          fontSmoothing: "antialiased",
          letterSpacing: "0.025em",
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "white",
          margin: "18px",
          height: "30px",
          "::placeholder": {
            color: "#667085",
            margin: "18px",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const completed = {
  cvc: false,
  number: false,
  expiry: false,
};
function CheckoutForm({
  subscribe,
  email,
  phoneNumber,
}: {
  subscribe: (paymentMethod: PaymentMethod) => Promise<{
    message: string;
    clientSecret?: string;
    actionRequired?: boolean;
    id?: string;
  } | null>;
  email: string;
  phoneNumber: string;
}) {
  const [checkoutError, setCheckoutError] = useState<string | undefined>();
  const [disabled, setDisabledState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [danger, setDanger] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [name, setFullName] = useState("");

  const stripe = useStripe() as Stripe | null;
  const elements = useElements() as StripeElements | null;
  const options = useOptions();

  const handleCardDetailsChange = (
    event:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent
  ) => {
    if (event.error) {
      setCheckoutError(event.error.message);
    } else {
      setCheckoutError(undefined);
    }

    if (event.complete) {
      if (event.elementType === "cardNumber") {
        elements?.getElement(CardExpiryElement)?.focus();
        completed.number = true;
      }

      if (event.elementType === "cardExpiry") {
        elements?.getElement(CardCvcElement)?.focus();
        completed.expiry = true;
      }

      if (event.elementType === "cardCvc") {
        completed.cvc = true;
      }

      if (completed.number && completed.cvc && completed.expiry) {
        setDisabledState(false);
      }
    } else {
      if (event.elementType === "cardNumber") {
        completed.number = false;
      }

      if (event.elementType === "cardExpiry") {
        completed.expiry = false;
      }

      if (event.elementType === "cardCvc") {
        completed.cvc = false;
      }

      if (!completed.number || !completed.cvc || !completed.expiry) {
        setDisabledState(true);
      }
    }
  };

  const createPaymentMethod = async () => {
    setLoading(true);
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        throw new Error("Card element is not available.");
      }

      const result: PaymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
          phone: phoneNumber,
        },
      });

      if (result.error) {
        // Handle error
        console.error("Error creating payment method:", result.error.message);
        setDanger(result.error.message ?? null);
        return null;
      }

      // Success: return the PaymentMethod
      return result.paymentMethod;
    } catch (error) {
      console.error("Error creating payment method:", error);
      return null; // Explicitly return null in case of failure
    }
  };

  return (
    <>
      <div className={` p-3 stripe card ${loading && "card--opacity-50"}`}>
        <form
          className="flex flex-col mt-4 w-full"
          id="myForm"
          onSubmit={async (event) => {
            event.preventDefault();

            setLoading(true);
            setDanger(null)
            setSuccess(null)
            setInfo(null)
            const paymentMethod: PaymentMethod | null =
              await createPaymentMethod();
            if (paymentMethod == null) {
              return;
            }
            const response = await subscribe(paymentMethod);

            if (response == null) {
              setLoading(false);
              return;
            }
            if (response.actionRequired) {
              const cardElement = elements?.getElement(CardNumberElement);
              if (!cardElement) {
                return setDanger("Failed");
              }

              const result = await stripe?.confirmCardPayment(
                response.clientSecret!,
                {
                  payment_method: {
                    card: cardElement,
                    billing_details: {
                      name: "Jenny Rosen",
                    },
                  },
                }
              );

              if (result?.error) {
                setLoading(false);
                setDanger(
                  result?.error?.message ?? "Ödəniş zamanı bir xəta baş verdi."
                );
              } else if (result?.paymentIntent) {
                setLoading(true);
                switch (result.paymentIntent.status) {
                  case "succeeded":
                    setLoading(false);
                    setSuccess("Ödəniş uğurla tamamlandı. Təşəkkür edirik!"); // Payment successful
                    break;
                  case "canceled":
                    setLoading(false);
                    setDanger(
                      "Ödəniş ləğv edildi. Xahiş edirik yenidən cəhd edin."
                    ); // Payment canceled

                    break;

                  case "processing":
                    setLoading(false);
                    setInfo("Ödəniş hələ emal edilir. Zəhmət olmasa gözləyin.");
                    break;

                  case "requires_confirmation":
                    const nextAction = result.paymentIntent.next_action;

                    // Check for additional steps like 3D Secure
                    if (
                      nextAction?.type === "redirect_to_url" &&
                      nextAction.redirect_to_url &&
                      nextAction.redirect_to_url.url
                    ) {
                      window.location.href = nextAction.redirect_to_url.url; // Redirect to 3D Secure page
                    } else {
                      // In case of other next actions, handle them appropriately
                      setLoading(false);
                      setDanger(
                        "Ödənişin təsdiqi üçün əlavə addımlar atılmalıdır."
                      );
                    }
                    break;
                  default:
                    setLoading(false);
                    setDanger(
                      "Naməlum ödəniş vəziyyəti. Zəhmət olmasa dəstək ilə əlaqə saxlayın."
                    ); // Handle unexpected status
                    break;
                }
              } else {
                setLoading(false);
              }
            }
          }}
        >
          <label className="card-element w-100 mb-4">
            <input
              type="text"
              onChange={(event) => {
                const value = event.target.value;

                setFullName(value);
              }}
              placeholder="Name on the card"
            />
          </label>

          <label className="card-number">
            <CardNumberElement
              options={options}
              onChange={handleCardDetailsChange}
            />
          </label>
          <div className="flex justify-between" style={{ gap: "25px" }}>
            <label className="card-element">
              <CardExpiryElement
                options={options}
                onChange={handleCardDetailsChange}
              />
            </label>
            <label className="card-element">
              <CardCvcElement
                options={options}
                onChange={handleCardDetailsChange}
              />
            </label>
          </div>

          <div className={`btns ${loading && "card--opacity-50"}`}>
            <SubmitBtn label="Submit" />
          </div>
        </form>
      </div>
      {danger != null ? (
        <Danger
          message={danger}
          click={() => {
            setDanger(null);
          }}
        />
      ) : null}
      {success != null ? (
        <div className="fixed bottom-0 w-screen flex justify-center">
          <Success message={success} />
        </div>
      ) : null}
      {info != null ? (
        <div className="fixed bottom-0 w-screen flex justify-center">
          <Info message={info} />
        </div>
      ) : null}
      {loading ? <Spinner /> : null}
    </>
  );
}

export default CheckoutForm;
