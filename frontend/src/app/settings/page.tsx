"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Globe,
  Palette,
  Volume2,
  Server,
  Key,
  Save,
  RotateCcw,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

interface SettingsState {
  language: string;
  voiceEnabled: boolean;
  voiceSpeed: number;
  apiProvider: string;
  apiKey: string;
  apiUrl: string;
  model: string;
  useMockData: boolean;
  theme: string;
  animations: boolean;
  steamEffects: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    language: "en",
    voiceEnabled: true,
    voiceSpeed: 1.0,
    apiProvider: "mock",
    apiKey: "",
    apiUrl: "https://api.openai.com/v1",
    model: "gpt-4o",
    useMockData: true,
    theme: "dark",
    animations: true,
    steamEffects: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("cooklens_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings({
      language: "en",
      voiceEnabled: true,
      voiceSpeed: 1.0,
      apiProvider: "mock",
      apiKey: "",
      apiUrl: "https://api.openai.com/v1",
      model: "gpt-4o",
      useMockData: true,
      theme: "dark",
      animations: true,
      steamEffects: true,
    });
  };

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "es", name: "Español (Spanish)" },
    { code: "fr", name: "Français (French)" },
    { code: "ja", name: "日本語 (Japanese)" },
    { code: "zh", name: "中文 (Chinese)" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 ml-16 md:ml-20 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-playfair)]">
                <SettingsIcon className="inline-block mr-3 text-[var(--accent-amber)]" size={36} />
                Settings
              </h1>
              <p className="text-[var(--text-secondary)] mt-2">
                Configure your CookLens experience
              </p>
            </div>
            <div className="flex gap-3">
              <GlowButton variant="secondary" size="sm" onClick={handleReset}>
                <RotateCcw size={14} className="mr-2" />
                Reset
              </GlowButton>
              <GlowButton size="sm" onClick={handleSave}>
                {saved ? (
                  <>
                    <Check size={14} className="mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save size={14} className="mr-2" />
                    Save
                  </>
                )}
              </GlowButton>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Language & Voice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2 font-[family-name:var(--font-playfair)]">
                  <Globe size={20} className="text-[var(--accent-amber)]" />
                  Language & Voice
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Recipe Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting("language", e.target.value)}
                      className="w-full md:w-72 bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[var(--text-primary)] font-medium">
                        <Volume2 size={16} className="inline-block mr-2" />
                        Voice Assistant
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Read recipe steps aloud using Web Speech API
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("voiceEnabled", !settings.voiceEnabled)
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.voiceEnabled
                          ? "bg-[var(--accent-amber)]"
                          : "bg-[var(--bg-primary)] border border-[var(--border-glass)]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          settings.voiceEnabled
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  {settings.voiceEnabled && (
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">
                        Voice Speed: {settings.voiceSpeed}x
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={settings.voiceSpeed}
                        onChange={(e) =>
                          updateSetting("voiceSpeed", parseFloat(e.target.value))
                        }
                        className="w-full md:w-72 accent-[var(--accent-amber)]"
                      />
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* AI Provider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2 font-[family-name:var(--font-playfair)]">
                  <Server size={20} className="text-[var(--accent-amber)]" />
                  AI Configuration
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-2">
                      Provider
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        {
                          id: "mock",
                          name: "Demo Mode",
                          desc: "Uses built-in mock data",
                        },
                        {
                          id: "openai",
                          name: "OpenAI",
                          desc: "GPT-4V / GPT-4o",
                        },
                        {
                          id: "ollama",
                          name: "Ollama (Local)",
                          desc: "LLaVA / Llama Vision",
                        },
                      ].map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => {
                            updateSetting("apiProvider", provider.id);
                            updateSetting(
                              "useMockData",
                              provider.id === "mock"
                            );
                            if (provider.id === "ollama") {
                              updateSetting(
                                "apiUrl",
                                "http://localhost:11434/v1"
                              );
                              updateSetting("model", "llama3.2-vision");
                            } else if (provider.id === "openai") {
                              updateSetting(
                                "apiUrl",
                                "https://api.openai.com/v1"
                              );
                              updateSetting("model", "gpt-4o");
                            }
                          }}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            settings.apiProvider === provider.id
                              ? "border-[var(--accent-amber)] bg-[var(--accent-amber)]/5"
                              : "border-[var(--border-glass)] hover:border-[var(--accent-amber)]/50"
                          }`}
                        >
                          <h4 className="font-medium text-[var(--text-primary)]">
                            {provider.name}
                          </h4>
                          <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {provider.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  {settings.apiProvider !== "mock" && (
                    <>
                      <div>
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">
                          <Key size={14} className="inline-block mr-1" />
                          API Key
                        </label>
                        <input
                          type="password"
                          value={settings.apiKey}
                          onChange={(e) =>
                            updateSetting("apiKey", e.target.value)
                          }
                          placeholder={
                            settings.apiProvider === "ollama"
                              ? "ollama (not required)"
                              : "sk-..."
                          }
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[var(--accent-amber)] transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-2">
                            API Base URL
                          </label>
                          <input
                            value={settings.apiUrl}
                            onChange={(e) =>
                              updateSetting("apiUrl", e.target.value)
                            }
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-amber)] transition-colors font-mono text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[var(--text-secondary)] mb-2">
                            Model
                          </label>
                          <input
                            value={settings.model}
                            onChange={(e) =>
                              updateSetting("model", e.target.value)
                            }
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-glass)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-amber)] transition-colors font-mono text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* Appearance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2 font-[family-name:var(--font-playfair)]">
                  <Palette size={20} className="text-[var(--accent-amber)]" />
                  Appearance
                </h2>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[var(--text-primary)] font-medium">
                        Animations
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Enable entrance animations and transitions
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("animations", !settings.animations)
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.animations
                          ? "bg-[var(--accent-amber)]"
                          : "bg-[var(--bg-primary)] border border-[var(--border-glass)]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          settings.animations
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[var(--text-primary)] font-medium">
                        Steam Effects
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Show ambient steam/smoke particle animations
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateSetting("steamEffects", !settings.steamEffects)
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.steamEffects
                          ? "bg-[var(--accent-amber)]"
                          : "bg-[var(--bg-primary)] border border-[var(--border-glass)]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                          settings.steamEffects
                            ? "translate-x-6"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
