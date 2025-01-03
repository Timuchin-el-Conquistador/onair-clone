"use client";

import dynamic from "next/dynamic";

import "@/styles/settings.scss";

import { type Settings as ISettings } from "@/lib/types/settings";
import { useState } from "react";
import { type User } from "@/lib/types/user";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlSwitch = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/switch/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlDialog = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

type PageProps = {
  initialSettings: ISettings;
};

function Settings(props: PageProps) {
  const [user, updateUser] = useState<Omit<User, "subscription">>({
    name: props.initialSettings.user.name,
    email: props.initialSettings.user.email,
  });
  const [notificationsState, setNotificationsState] = useState<boolean>(
    props.initialSettings.browserNotifications
  );
  const [editableFields, setEditableFields] = useState<string[]>([]);
  return (
    <div id="settings" className="p-6 mb-24">
      <h3 className="font-semibold text-lg mb-1">Profile</h3>{" "}
      <div className="bg-white p-6">
        <dl style={{ marginTop: "-1rem" }}>
          {editableFields.includes("name") ? (
            <form method="post">
              <div className="sm:flex block w-full">
                <div className="sm:w-80 w-full">
                  <span>First Name</span>{" "}
                  <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    value={user.name.split(" ")[0]}
                    className="p-1.5 rounded w-full block"
                  />
                </div>{" "}
                <div className="sm:ml-3 ml-0 sm:mt-0 mt-3 sm:w-80 w-full">
                  <span>Last Name</span>{" "}
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={user.name.split(" ")[1]}
                    className="p-1.5 rounded block w-full"
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
                {user.name}
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
            <form method="post">
              <div className="sm:flex block w-full">
                <div className="sm:w-80 w-full">
                  <span>First Name</span>{" "}
                  <input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    value={user.name.split(" ")[0]}
                    className="p-1.5 rounded w-full block"
                  />
                </div>{" "}
                <div className="sm:ml-3 ml-0 sm:mt-0 mt-3 sm:w-80 w-full">
                  <span>Last Name</span>{" "}
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={user.name.split(" ")[1]}
                    className="p-1.5 rounded block w-full"
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
                {user.name}
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
              Basic Plan (trial)
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
              <a href="/users/sign_out">Sign out</a> from your account
            </dt>
          </div>
        </dl>
      </div>{" "}
      <h3 className="font-semibold text-lg mb-1 mt-8">Account Stats</h3>{" "}
      <div className="bg-white p-6">
        <dl style={{ marginTop: "-1rem" }}>
          <div>
            <dt># of Links</dt> <dd>1 link</dd>
          </div>{" "}
          <div>
            <dt>Monthly Minutes Capacity</dt>{" "}
            <dd>
              1,000 (<a href="/billing">increase</a>)
            </dd>
          </div>{" "}
          <div>
            <dt>Monthly Minutes Consumed</dt> <dd>1 (0%)</dd>
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
