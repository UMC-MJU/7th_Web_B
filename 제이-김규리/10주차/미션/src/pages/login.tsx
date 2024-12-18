import StyledTxt from "../components/custom-Txt";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledForm = styled.form`
  margin-top: 50px;
  width: 370px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  box-sizing: border-box;
  padding-left: 12px;
`;

const LoginButton = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #e7545b;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const ErrorTxt = styled.p`
  color: red;
  font-size: 10px;
`;

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다. 다시 한번 확인해주세요!")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .required("비밀번호를 반드시 입력해주세요.")
      .min(8, "비밀번호는 8~16자 사이로 입력해주세요!")
      .max(16, "비밀번호는 8~16자 사이로 입력해주세요!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledTxt style={{ marginBottom: "40px", textAlign: "center" }}>
          로그인
        </StyledTxt>
        <StyledInput
          type="email"
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
          onBlur={() => trigger("email")}
        />
        <ErrorTxt>{errors.email?.message}</ErrorTxt>
        <StyledInput
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
          onBlur={() => trigger("password")}
        />
        <ErrorTxt>{errors.password?.message}</ErrorTxt>
        <LoginButton type="submit" value="로그인" />
      </StyledForm>
    </div>
  );
};

export default LoginPage;
