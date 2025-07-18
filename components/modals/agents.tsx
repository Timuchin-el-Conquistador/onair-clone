"use client";

import dynamic from "next/dynamic";

import "@/styles/agents.scss";
import { useRef, useState } from "react";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlDialog = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

type Componentprops = {
  isOpen: boolean;
  closeModal: () => void;
  useAvatar: (
    presenterId: string,
    driverId: string,
    voice: { id: string; provider: string }
  ) => void;
};

function Agents(props: Componentprops) {
  const [agents, setAgents] = useState([
    {
      url: "https://clips-presenters.d-id.com/v2/alex/qcvo4gupoy/e3nbserss8/talkingPreviewUrl.mp4",
      presenterId: "v2_public_alex@qcvo4gupoy",
      driverId: "e3nbserss8",
      voice: {
        id: "en-US-AndrewNeural",
        provider: "microsoft",
      },
      active: false,
    },
    {
      url: "https://clips-presenters.d-id.com/v2/alyssa_red_suite_green_screen/46XonMxLFm/LRjggU94ze/talking_preview.mp4",
      presenterId: "v2_public_alyssa_red_suite_green_screen@46XonMxLFm",
      driverId: "LRjggU94ze",
      voice: {
        id: "en-US-AvaMultilingualNeural",
        provider: "microsoft",
      },
      active: true,
    },
  ]);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const next = () => {
    let index = agents.findIndex((el) => el.active);
    let nextIndex = index + 1 < agents.length ? index + 1 : 0;

    const currentVideo = videoRefs.current[index];
    const nextVideo = videoRefs.current[nextIndex];

    // Остановить текущее видео
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
      currentVideo.currentTime = 0; // если хочешь вернуть в начало
    }

    // Запустить предыдущее видео
    if (nextVideo) {
      try {
        nextVideo.play();
      } catch (err) {
        console.error("Failed to play video:", err);
      }
    }

    setAgents((prevState) =>
      prevState.map((el, i) => {
        if (i == index) {
          return {
            ...el,
            active: false,
          };
        }
        if (nextIndex == i) {
          return {
            ...el,
            active: true,
          };
        }
        return el;
      })
    );
  };

  const previous = () => {
    let index = agents.findIndex((el) => el.active);
    let prevIndex = index - 1 >= 0 ? index - 1 : agents.length - 1;

    const currentVideo = videoRefs.current[index];
    const prevVideo = videoRefs.current[prevIndex];

    // Остановить текущее видео
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
      currentVideo.currentTime = 0; // если хочешь вернуть в начало
    }

    // Запустить предыдущее видео
    if (prevVideo) {
      try {
        prevVideo.play();
      } catch (err) {
        console.error("Failed to play video:", err);
      }
    }

    setAgents((prevState) =>
      prevState.map((el, i) => {
        if (i == index) {
          return {
            ...el,
            active: false,
          };
        }
        if (prevIndex == i) {
          return {
            ...el,
            active: true,
          };
        }
        return el;
      })
    );
  };

  return (
    <SlDialog
      label=""
      className="dialog-overview with-header"
      open={props.isOpen}
      onSlAfterHide={props.closeModal}
      noHeader
    >
      <div className="p-2">
        <div className="slider-container">
          <div className="slider">
            {props.isOpen &&
              agents.map((agent, i) => (
                <div
                  className={`slide  transition-fade ${
                    agent.active && "active"
                  }`}
                  key={i}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    autoPlay={agent.active}
                  >
                    <source src={agent.url} type="video/mp4" />
                  </video>
                  {/*<div className="slide-content">
                  <h2 className="slide-title">Amazing Landscapes</h2>
                  <p className="slide-description">
                    Discover beautiful natural scenery from around the world
                  </p>
                </div>*/}
                </div>
              ))}
          </div>

          <div className="navigation">
            <button onClick={previous} className="nav-btn prev">
              &lt;
            </button>
            <button onClick={next} className="nav-btn next">
              &gt;
            </button>
          </div>

          <div className="dots-container"></div>
        </div>
        <div className="flex justify-between mt-8">
          <SlButton
            slot="footer"
            variant="default"
            size="medium"
            data-optional=""
            data-valid=""
            className="text-sm sm:text-base mr-4"
            onClick={props.closeModal}
          >
            Cancel
          </SlButton>{" "}
          <SlButton
            slot="footer"
            variant="primary"
            size="medium"
            data-optional=""
            data-valid=""
            className="text-sm sm:text-base"
            onClick={() => {
              const index = agents.findIndex((el) => el.active);
              props.useAvatar(
                agents[index].presenterId,
                agents[index].driverId,
                agents[index].voice
              );
            }}
          >
            Use this avatar
          </SlButton>
        </div>
      </div>
    </SlDialog>
  );
}

export default Agents;
