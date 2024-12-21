import { ExternalProvider } from "@ethersproject/providers";

// This extends the existing Window type to include the ethereum property
declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}
