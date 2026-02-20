"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import login from "@/media/r1.jpg";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const [image, setImage] = useState(login);
  const [user, setUser] = useState({
    location: "",
  });
  const [profileMeta, setProfileMeta] = useState({
    name: "",
    email: "",
  });
  const [connections, setConnections] = useState({
    youtube: { connected: false, url: "" },
    tiktok: { connected: false, url: "" },
    instagram: { connected: false, url: "" },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/profileinfo`,
        );

        if (response.data?.user) {
          const prevImage = response.data.user.userPhoto || login;
          const prevLocation = response.data.user.location || "";
          const name =
            response.data.user.name || response.data.user.username || "";
          const email = response.data.user.email || "";

          setImage(prevImage);
          setUser((previous) => ({
            ...previous,
            location: prevLocation,
          }));
          setProfileMeta({
            name,
            email,
          });
        }
      } catch (error) {
        console.error("Failed to load profile info", error);
      }
    };

    fetchData();
  }, []);

  const saveData = async () => {
    try {
      const loadingId = toast.loading("Saving profile...");

      // Extract just the URLs from the connections state so the payload stays simple.
      const socialLinks = {
        youtube: connections.youtube.url || "",
        tiktok: connections.tiktok.url || "",
        instagram: connections.instagram.url || "",
      };

      const verifyData = {
        ...user,
        userPhoto: image,
        socialLinks,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profileupdate`,
        verifyData,
      );

      toast.dismiss(loadingId);

      if (response.data?.success) {
        toast.success(response.data.message || "Profile updated");
      } else {
        toast.error(response.data?.message || "Unable to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const upload = async (event) => {
    try {
      const uploadedUrl = await ImageUpload(event);
      setImage(uploadedUrl);
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 to-purple-50 px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          {/* Page header */}
          <header className="flex flex-col gap-2 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
                Account
              </p>
              <h1 className="mt-1 font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
                Profile & Preferences
              </h1>
              <p className="mt-1 text-sm text-slate-500 md:text-base">
                Manage how you appear across the platform and keep your
                information up to date.
              </p>
            </div>
          </header>

          {/* Content grid */}
          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* Profile summary card */}
            <section className="flex flex-col items-center gap-6 rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Image
                    src={image}
                    width={login.width}
                    height={login.height}
                    alt="Profile avatar"
                    className="h-[120px] w-[120px] rounded-full object-cover shadow-md md:h-[160px] md:w-[160px]"
                  />
                  <label
                    htmlFor="file"
                    className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-xs font-medium text-white shadow-md transition hover:bg-purple-700"
                    title="Change avatar"
                  >
                    ✎
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={upload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="text-center">
                  <p className="font-sans text-lg font-semibold text-slate-900">
                    {profileMeta.name || "Your name"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {profileMeta.email || "Add your email in account settings"}
                  </p>
                </div>
              </div>

              <div className="mt-4 w-full space-y-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">
                  Profile tips
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Use a clear profile photo so people recognize you.</li>
                  <li>Keep your location accurate for better recommendations.</li>
                </ul>
              </div>
            </section>

            {/* Editable fields */}
            <section className="flex flex-col gap-6 rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
              <div className="space-y-6">
                <div>
                  <h2 className="font-sans text-lg font-semibold text-slate-900">
                    Public information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    These details help personalize your experience and how
                    others see you.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Location
                    </label>
                    <Input
                      type="text"
                      label="Location"
                      variant="underlined"
                      size="lg"
                      value={user.location}
                      placeholder="e.g. New Delhi, India"
                      onChange={(event) =>
                        setUser((previous) => ({
                          ...previous,
                          location: event.target.value,
                        }))
                      }
                      className="w-full selection:bg-black selection:text-white"
                    />
                    <p className="text-xs text-slate-400">
                      Your location may be used to tailor content and
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Connected channels
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Link your social accounts to export or share content more
                    easily. Connection flow will open in a separate window.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      key: "youtube",
                      label: "YouTube",
                      helper: "Recommended for long‑form and shorts.",
                    },
                    {
                      key: "tiktok",
                      label: "TikTok",
                      helper: "Perfect for vertical viral shorts.",
                    },
                    {
                      key: "instagram",
                      label: "Instagram Reels",
                      helper: "Share directly to your audience.",
                    },
                  ].map((item) => {
                    const { connected, url } = connections[item.key];
                    const isConnected = connected;
                    return (
                      <div
                        key={item.key}
                        className="space-y-2 rounded-xl bg-slate-50 px-3 py-2.5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {item.label}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.helper}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            radius="full"
                            variant={isConnected ? "flat" : "solid"}
                            color={isConnected ? "success" : "primary"}
                            className="text-xs font-semibold"
                            onPress={() => {
                              // Toggle connected state; when first connecting,
                              // reveal the input field so user can enter their link.
                              setConnections((prev) => ({
                                ...prev,
                                [item.key]: {
                                  ...prev[item.key],
                                  connected: !isConnected,
                                },
                              }));
                            }}
                          >
                            {isConnected ? "Connected" : "Connect"}
                          </Button>
                        </div>

                        {isConnected && (
                          <div className="space-y-2 pl-1">
                            <Input
                              size="sm"
                              type="url"
                              label="Profile / channel link"
                              placeholder={`Paste your ${item.label} URL`}
                              variant="bordered"
                              value={url}
                              onChange={(event) => {
                                const value = event.target.value;
                                setConnections((prev) => ({
                                  ...prev,
                                  [item.key]: {
                                    ...prev[item.key],
                                    url: value,
                                  },
                                }));
                              }}
                              className="mt-1 w-full"
                            />
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] text-slate-400">
                                This link will be saved to your profile when
                                you save.
                              </p>
                              <Button
                                size="sm"
                                variant="light"
                                className="text-[11px] text-slate-700"
                                onPress={saveData}
                              >
                                Save link
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="light"
                  size="sm"
                  className="text-slate-600"
                  onPress={() =>
                    setUser((previous) => ({
                      ...previous,
                      location: "",
                    }))
                  }
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  className="px-6"
                  onPress={saveData}
                >
                  Save changes
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;