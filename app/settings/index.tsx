"use client";

import dynamic from "next/dynamic";

import "@/styles/settings.scss";

import { useState } from "react";

import Link from "next/link";

import { useUserStore } from "@/providers/user";

import { useVisibility } from "@/hooks/alerts-visibility";

import { useRouter } from "next/navigation";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlSwitch = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/switch/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlDialog = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlIcon = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlBadge = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/badge/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

type PageProps = {
  user: {
    fullName: string;
    email: string;
  };
  browserNotifications: boolean;
  monthlyMinutesCapacity: number;
  monthlyMinutesConsumed: number;
  numberOfCreatedLinks: number;
  planName: string;
  monthlyLinksCapacity: number;
  subscriptionStatus: string;
};

function Settings(props: PageProps) {
  const router = useRouter();

  const { error, loading, success, reset, changeEmail, changeName } =
    useUserStore((state) => state);
  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
    isSuccessAlertVisible,
  } = useVisibility(reset, error, loading, success);

  const [user, updateUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: props.user.fullName.split(" ")[0],
    lastName: props.user.fullName.split(" ")[1],
    email: props.user.email,
  });
  const [notificationsState, setNotificationsState] = useState<boolean>(
    props.browserNotifications
  );
  const [editableFields, setEditableFields] = useState<string[]>([]);

  console.log(props.numberOfCreatedLinks, "props");
  return (
    <div id="settings" className="p-6 mb-24">

        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: isSuccessAlertVisible ? "block" : "hidden",
          }}
        >
          <SlAlert variant="primary" open={isSuccessAlertVisible}>
            <SlIcon slot="icon" name="info-circle"></SlIcon>
            <strong>{success}</strong>
          </SlAlert>
        </div>
      
  
        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: isDangerAlertVisible ? "block" : "hidden",
          }}
        >
          <SlAlert variant="danger" open={isDangerAlertVisible}>
            <SlIcon slot="icon" name="exclamation-octagon"></SlIcon>
            <strong>{error?.message}</strong>
          </SlAlert>
        </div>
    
      <h3 className="font-semibold text-lg mb-1">Profile</h3>{" "}
      <div className="bg-white p-6">
        <dl style={{ marginTop: "-1rem" }}>
          {editableFields.includes("name") ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                changeName(user.firstName + " " + user.lastName, router);
                setEditableFields((prevState) =>
                  prevState.filter((el) => el != "name")
                );
              }}
            >
              <div className="sm:flex block w-full">
                <div className="sm:w-80 w-full">
                  <span>First Name</span>{" "}
                  <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    value={user.firstName}
                    className="p-1.5 rounded w-full block"
                    onChange={(event) => {
                      const firstName = (event.target as HTMLInputElement)
                        .value;
                      updateUser((prevState) => ({
                        ...prevState,
                        firstName,
                      }));
                    }}
                  />
                </div>{" "}
                <div className="sm:ml-3 ml-0 sm:mt-0 mt-3 sm:w-80 w-full">
                  <span>Last Name</span>{" "}
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={user.lastName}
                    className="p-1.5 rounded block w-full"
                    onChange={(event) => {
                      const lastName = (event.target as HTMLInputElement).value;
                      updateUser((prevState) => ({
                        ...prevState,
                        lastName,
                      }));
                    }}
                  />
                </div>{" "}
                <div className="items-left sm:ml-3 sm:mt-6  ml-0 sm:mt-0  flex items-end">
                  <input
                    type="submit"
                    value="Save"
                    className="btn btn-blue mb-1 !leading-none"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div>
              <dt>Name</dt>{" "}
              <dd className="group relative">
                {user.firstName + " " + user.lastName}
                <SlButton
                  size="small"
                  variant="default"
                  data-optional=""
                  data-valid=""
                  className="edit-btn"
                  onClick={() => {
                    setEditableFields((state) => [...state, "name"]);
                  }}
                >
                  Edit
                </SlButton>
              </dd>
            </div>
          )}
          {editableFields.includes("email") ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                changeEmail(user.email, router);
                setEditableFields((prevState) =>
                  prevState.filter((el) => el != "email")
                );
              }}
            >
              <div className="sm:flex block w-full">
                <div className="sm:w-80 w-full">
                  <span>Email</span>{" "}
                  <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={user.email}
                    className="p-1.5 rounded w-full block"
                    onChange={(event) => {
                      const email = (
                        event.target as HTMLInputElement
                      ).value.trim();
                      updateUser((prevState) => ({
                        ...prevState,
                        email,
                      }));
                    }}
                  />
                </div>{" "}
                <div className="items-left sm:ml-3 sm:mt-6  ml-0 sm:mt-0  flex items-end">
                  <input
                    type="submit"
                    value="Save"
                    className="btn btn-blue mb-1 !leading-none"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div>
              <dt>Email</dt>{" "}
              <dd className="group relative">
                {user.email}
                <SlButton
                  size="small"
                  variant="default"
                  data-optional=""
                  data-valid=""
                  className="edit-btn"
                  onClick={() => {
                    setEditableFields((state) => [...state, "email"]);
                  }}
                >
                  Edit
                </SlButton>
              </dd>
            </div>
          )}
          <div>
            <dt>Subscription Plan</dt>{" "}
            <dd className="group relative">
              {props.planName}
              <a href="/billing">
                <SlButton
                  size="small"
                  variant="default"
                  data-optional=""
                  data-valid=""
                  className="edit-btn"
                >
                  Edit
                </SlButton>
              </a>
            </dd>
          </div>{" "}
          <div>
            <dt className="whitespace-nowrap">
              <Link href="/users/sign_out">Sign out</Link> from your account
            </dt>
          </div>
        </dl>
      </div>{" "}
      <h3 className="font-semibold text-lg mb-1 mt-8">Account Stats</h3>{" "}
      <div className="bg-white p-6">
        <dl style={{ marginTop: "-1rem" }}>
          <div>
            <dt># of Links</dt> <dd>{props.numberOfCreatedLinks} link</dd>
          </div>{" "}
          <div>
            <dt>Monthly Minutes Capacity</dt>
            <dd>
              {props.monthlyMinutesCapacity}
              {props.subscriptionStatus != "active" &&
                props.subscriptionStatus != "trialing" && (
                  <SlBadge
                    variant="danger"
                    className="inline-block sm:ml-2 ml-0 sm:mr-1 mr-0 sm:my-0"
                    pulse
                  >
                    low
                  </SlBadge>
                )}
             {' '} (<Link href="/billing">increase</Link>)
            </dd>
          </div>{" "}
          <div>
            <dt>Monthly Minutes Consumed</dt>{" "}
            <dd>
              {props.monthlyMinutesConsumed} (
              {props.subscriptionStatus == "active" ||
              props.subscriptionStatus == "trialing"
                ? Math.round(
                    100 -
                      (props.monthlyMinutesConsumed / 100) *
                        props.monthlyMinutesCapacity
                  )
                : 0}
              %)
              {props.subscriptionStatus != "active" &&
                props.subscriptionStatus != "trialing" && (
                  <SlBadge
                    variant="danger"
                    className="inline-block sm:ml-2 ml-0 sm:mr-1 mr-0 sm:my-0"
                    pulse
                  >
                    low
                  </SlBadge>
                )}
              {' '}(<Link href="/billing">increase</Link>)
            </dd>
          </div>
        </dl>
      </div>{" "}
      <h3 className="font-semibold text-lg mb-1 mt-8">Notifications</h3>{" "}
      <div className="bg-white p-6">
        <dl style={{ marginTop: "-1rem" }}>
          <div>
            <dt>Browser notifications</dt>{" "}
            <dd>
              <SlSwitch
                value="true"
                size="medium"
                form=""
                data-optional=""
                data-valid=""
                checked={notificationsState}
                onSlChange={(event) => {
                  const checked = (event.target as HTMLInputElement).checked;
                  setNotificationsState(checked);
                }}
              ></SlSwitch>
            </dd>
          </div>
        </dl>
      </div>{" "}
      <form
        id="settingsForm"
        action="/settings/update_profile"
        method="POST"
        className="p-0 border-none"
      >
        <input
          id="isBrowserNotificationsEnabled"
          type="hidden"
          name="settings[browserNotifications]"
          value="true"
        />
      </form>
      <SlDialog no-header="" label="" className="dialog-deny-close">
        <div className="p-2">
          <div className="flex items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-700">
              Delete account?
            </h2>
          </div>
          <p className="text-gray-700 mt-2">
            All your account data will be deleted permanently. This operation is
            not reversible.
            <br />
            <br />
            <b>Email:</b> hemidovcingiz183@gmail.com <br /> <b>Pages:</b> 1
          </p>
          <div className="mt-4 text-sm">
            If you want to continue, please type 'permanently delete' below.
          </div>
          <input type="text" className="mt-2 w-full text-sm" />
          <div className="flex justify-between mt-8">
            <SlButton
              slot="footer"
              variant="default"
              size="medium"
              data-optional=""
              data-valid=""
              className="text-sm sm:text-base mr-4"
            >
              Cancel
            </SlButton>
            <SlButton
              slot="footer"
              variant="danger"
              disabled
              size="medium"
              data-optional=""
              data-valid=""
              className="text-sm sm:text-base"
            >
              Delete
            </SlButton>
          </div>
        </div>
      </SlDialog>
    </div>
  );
}

export default Settings;
