// src/global.d.ts

// Let TS know that we can import “.css” (and other style files) without errors
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

// Tell TS that “@smastrom/react-rating/dist/index” is a module.
// We’ll mock it in tests, so TS shouldn’t freak out.
declare module "@smastrom/react-rating/dist/index";
