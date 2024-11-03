import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("검증된 이메일을 입력해주세요.")
    .required("이메일을 반드시 입력해주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .required("비밀번호를 반드시 입력해주세요."),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 다릅니다.") // 다른 input의 입력값과 일치하는지 비교
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .required("비밀번호를 반드시 입력해주세요."),
});

export default schema;
