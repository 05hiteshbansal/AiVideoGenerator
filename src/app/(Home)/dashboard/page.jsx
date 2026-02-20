"use client";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect, useMemo } from "react";
import { PlusIcon, SearchIcon, SelectorIcon } from "@heroicons/react/outline";
import EmptyVideo from "@/components/dashboard/EmptyVideo";
import axios from "axios";
import VideoPlayer from "@/components/Player/VideoPlayer";
import { Thumbnail } from "@remotion/player";
import PlayerModel from "@/components/Player/Player";

const DashboardPage = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // recent | title
  const [activeVideo, setActiveVideo] = useState({
    images: [],
    audioUrl: "",
    scripts: [],
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getVideos`,
        );

        setVideoList(response.data?.message ?? []);
      } catch (err) {
        console.error("Failed to fetch videos", err);
        setError("Unable to load your videos. Please try again.");
        setVideoList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handlePlayVideo = (video) => {
    setActiveVideo(video);
    setIsPlayerOpen(true);
  };

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = Array.isArray(videoList) ? [...videoList] : [];

    const filtered = query
      ? list.filter((video) => {
          const title = (
            video?.title || (video?.id ? `Video ${video.id}` : "Untitled")
          ).toLowerCase();
          return title.includes(query);
        })
      : list;

    if (sortBy === "title") {
      filtered.sort((a, b) => (a?.title || "").localeCompare(b?.title || ""));
    } else {
      filtered.sort(
        (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0),
      );
    }

    return filtered;
  }, [videoList, search, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                Your Library
              </p>
              <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-2 text-base text-slate-600">
                Manage and preview your generated shorts
              </p>
              <div className="mt-3 inline-block rounded-lg bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                {videoList?.length || 0} videos created
              </div>
            </div>
            <Button
              as="a"
              href="/new"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-shadow"
            >
              + Create New Video
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            >
              <option value="recent">Most Recent</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200/50 bg-red-50 px-6 py-4 text-sm text-red-700 backdrop-blur-sm">
            <p className="font-semibold">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 backdrop-blur-sm"
              >
                <div className="mx-auto my-4 h-[450px] w-[300px] animate-pulse rounded-xl bg-slate-200" />
                <div className="p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <EmptyVideo />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <button
                type="button"
                key={video.id ?? index}
                onClick={() => handlePlayVideo(video)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all hover:scale-105 duration-300"
              >
                <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 p-3">
                  <Thumbnail
                    component={VideoPlayer}
                    compositionWidth={300}
                    compositionHeight={450}
                    frameToDisplay={30}
                    durationInFrames={120}
                    fps={30}
                    inputProps={{
                      ...video,
                      setDurationValue: () => {},
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                      <span className="text-lg">▶</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 text-left">
                        {video?.title ||
                          (video?.id ? `Video ${video.id}` : "Untitled")}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {video?.createdAt
                          ? new Date(video.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {isPlayerOpen && (
        <PlayerModel
          data={activeVideo}
          open={isPlayerOpen}
          setData={setActiveVideo}
          setOpen={setIsPlayerOpen}
        />
      )}
    </div>
  );
};

export default DashboardPage;
