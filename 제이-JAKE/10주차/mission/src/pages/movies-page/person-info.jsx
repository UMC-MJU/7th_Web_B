import styled from "styled-components";

const PersonContainer = styled.div`
    width: 90px;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const PersonImg = styled.img`
    width: 90%;
    height: 81px;
    object-fit: cover;
    border-radius: 50%;
    border: solid 2px white;
`;

const PersonInfo = ({person}) => {
    return(
        <PersonContainer>
            <PersonImg src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}/>
            <p style={{color: 'white', fontSize: '14px', marginBottom: '0'}}>{person.name}</p>
            <p style={{color: '#A9A9A9', fontSize: '12px', marginTop: '5px'}}>{person.character || person.job}</p>
        </PersonContainer>
    );
}

export default PersonInfo;