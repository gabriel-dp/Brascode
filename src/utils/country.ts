const BASE_URL = "https://flagsapi.com";
const IMAGE_SETTINGS = "shiny/64.png";

export const generateFlagUrl = (code: string): string => `${BASE_URL}/${code}/${IMAGE_SETTINGS}`;
