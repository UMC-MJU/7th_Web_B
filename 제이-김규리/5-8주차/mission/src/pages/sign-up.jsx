import StyledTxt from "../components/custom-Txt";
import styled from "styled-components"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

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
    const schema = yup.object().shape({
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
        passwordCheck: yup
            .string()
            .required('비밀번호 검증 또한 필수 입력요소 입니다.')
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.') // password와 일치하는지 확인
            .min(8, '비밀번호는 8~16자 사이로 입력해주세요!')
            .max(16, '비밀번호는 8~16자 사이로 입력해주세요!'),
    
    })

    // handleSubmit은 useForm에서 제공해준다.
    const {register, handleSubmit, formState: {errors}} = useForm({
        // 폼 제출 시 yup의 검증규칙 적용
        resolver: yupResolver(schema) // resolver: 외부 라이브러리와 통합하기 위한 옵션
    });

    const onSubmit = async (data) => {
        console.log('폼 데이터 제출: ', data)
        try {

            // localhost서버에서 저기 URL로 data 전송
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