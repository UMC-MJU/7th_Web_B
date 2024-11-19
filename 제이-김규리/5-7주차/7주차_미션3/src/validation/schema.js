import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    email: yup
        .string()
        .email('올바른 이메일 형식이 아닙니다. 다시 한번 확인해주세요!')
        .required('이메일을 반드시 입력해주세요.'),
    password: yup
        .string()
        .required('비밀번호를 반드시 입력해주세요.')
        .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
        .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
    passwordCheck: yup
        .string()
        .required('비밀번호 검증 또한 필수 입력요소 입니다.')
        .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
        .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
});
