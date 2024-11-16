import axios from "axios";

const signupInstance = axios.create({
  baseURL: "http://localhost:3000", // API의 기본 URL
});

signupInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // errpr.comfig에는 실패한 원래 요청의 설정이 저장됨.

    // 오류 상태가 401(Unauthorized)인지 확인
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // refreshToken으로 토큰 갱신 요청
      const refreshToken = localStorage.getItem("refreshToken");

      // refreshToken이 null일 경우
      if (!refreshToken) {
        console.warn(
          "Refresh token이 없습니다. 로그인 페이지로 리디렉션됩니다."
        );
        window.location.href = "/login";
        return Promise.reject(error); // catch에서 오류를 감지하고 후속 처리
      }
      try {
        const response = await signupInstance.post(
          "/auth/token/access",
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        // 새로운 토큰을 localStorage에 저장
        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          localStorage.setItem("token", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          console.log("토큰 재발급 완료");
        }

        /*아래 주석은 로그인 이후 권한이 필요한 API 요청을 계속 진행해야 할 때 필요*/

        // // 원래 요청의 Authorization 헤더 업데이트
        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // // 새로운 토큰으로 원래 요청을 다시 시도
        // return signupInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default signupInstance;
