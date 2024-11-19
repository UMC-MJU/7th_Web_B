import StyledTxt from "../components/custom-Txt";
import styled from "styled-components"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from "../validation/schema";

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

const SignUpPage = () => {
    const navigate = useNavigate();

    // handleSubmit은 useForm에서 제공해준다.
    const {register, handleSubmit, formState: {errors}} = useForm({
        // 폼 제출 시 yup의 검증규칙 적용
        resolver: yupResolver(signUpSchema) // resolver: 외부 라이브러리와 통합하기 위한 옵션
    });

    const onSubmit = async (data) => {
        console.log('폼 데이터 제출')
        try {
            const response = await axios.post('http://localhost:3000/auth/register', data);
            console.log('회원가입 성공:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert("회원가입에 실패하였습니다.")
        }
    }
    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
                <StyledTxt style={{marginBottom: '40px', textAlign: 'center'}}>회원가입</StyledTxt>
                <StyledInput type={'email'} placeholder='이메일을 입력해주세요!' {...register("email")}/>
                {/* register 한 이름에 맞게 연결해주세요! */}
                <ErrorTxt>{errors.email?.message}</ErrorTxt>
                <StyledInput type={'password'} placeholder='비밀번호를 입력해주세요!' {...register("password")}/>
                <ErrorTxt>{errors.password?.message}</ErrorTxt>
                <StyledInput type={'password'} placeholder='비밀번호를 다시 입력해주세요!' {...register("passwordCheck")}/>
                <ErrorTxt>{errors.passwordCheck?.message}</ErrorTxt>
                <LoginButton type={'submit'} value='제출' />
            </StyledForm>
        </div>
    );
}

export default SignUpPage;