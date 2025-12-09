/// <reference types="vite/client" />

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

interface ImportMetaEnv {
	readonly BASE_URL: string;
	readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
