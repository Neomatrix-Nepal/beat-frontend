import api from "../hooks/useApi";

interface JWTToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  //eslint-disable-next-line
  [key: string]: any;
}

export async function refreshAccessToken(token: JWTToken): Promise<JWTToken> {
  try {
    const response = await api.get("/auth/refresh-tokens", {
      params: {
        "refresh-token": token.refreshToken,
      },
    });

    const refreshedTokens = response.data.tokens;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken,
      accessTokenExpires: Date.now() + 20 * 1000,
    };
  } catch (error) {
    console.error("RefreshAccessToken error:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
