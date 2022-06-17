import { Platform} from "react-native";

export function useDevice() {
  const { OS: platform } = Platform;

 

  const isWeb = platform === "web";
  const isAndroid = platform === "android";
  const isIOS = platform === "ios";

  return {
    isWeb,
    isAndroid,
    isIOS,
    
  };
}