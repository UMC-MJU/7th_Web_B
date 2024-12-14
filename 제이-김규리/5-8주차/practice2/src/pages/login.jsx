import StyledTxt from '../components/custom-Txt'
import styled from "styled-components"
import {useForm} from '../hooks/use-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { validateLogin } from '../utils/validate'

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
    &:hover{
        opacity: 0.8;
    }
`;

const ErrorTxt = styled.p`
    color: red;
    font-size: 10px;
`;

const LoginPage = () => {
    /* yup을 사용해 이메일과 비밀번호 입력 필드에 대한 검증 규칙을 정의 */

   /*  const schema = yup.object().shape({
        email: yup
            .string()
            .email('올바른 이메일 형식이 아닙니다. 다시 한번 확인해주세요!')
            .required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            // required를 min보다 앞에 위치시켜 필수 필드 검증이 가장 먼저 실행되도록 수정
            .required('비밀번호를 반드시 입력해주세요.')
            .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
            .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
    })

    // handleSubmit은 useForm에서 제공해준다.
    const {register, handleSubmit, formState: {errors}} = useForm({
        // 폼 제출 시 yup의 검증규칙 적용
        resolver: yupResolver(schema) // resolver: 외부 라이브러리와 통합하기 위한 옵션
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출')
        console.log(data);
    } */
    
    const login = useForm({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin
    })

    const handlePressLogin = () => {
        console.log(login.values.email, login.values.password)
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <StyledInput error={login.touched.email && login.errors.email} type={'email'}
                         placeholder={'이메일을 입력해주세요!'} {...login.getTextInputProps('email')}/>
            {login.touched.email && login.errors.email && <ErrorTxt>{login.errors.email}</ErrorTxt>}    
            <StyledInput error={login.touched.password && login.errors.password} type={'password'}
                         placeholder={'비밀번호를 입력해주세요!'} {...login.getTextInputProps('password')}/>    
            {login.touched.password && login.errors.password && <ErrorTxt>{login.errors.password}</ErrorTxt>}    
           {/*  <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
                <StyledTxt style={{marginBottom: '40px', textAlign: 'center'}}>로그인</StyledTxt>
                <StyledInput type={'email'} placeholder='이메일을 입력해주세요!' {...register("email")}/>
                register 한 이름에 맞게 연결해주세요!
                <ErrorTxt>{errors.email?.message}</ErrorTxt>
                <StyledInput type={'password'} placeholder='비밀번호를 입력해주세요!' {...register("password")}/>
                <ErrorTxt>{errors.password?.message}</ErrorTxt>
                <LoginButton type={'submit'} value='로그인' />
            </StyledForm> */}
        </div>
    );
}

export default LoginPage;

/* input창을 누르고 다른 화면을 클릭하면 해당 input창을 유효성 검사를 해야함. 
-> 지금은 로그인 버튼을 눌러서 폼을 제출해야 유효성 검사를 함 */