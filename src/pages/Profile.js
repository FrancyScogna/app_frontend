import "./Profile.css";
import coverImage from "../images/cover-1500x500.png";
import avatarImage from "../images/avatar-400x400.png";
import { Avatar, useTheme } from "@mui/material";
import ButtonsGrid from "../components/profileComponents/ButtonsGrid";
import { lightenHexColor } from "../libs/utilFunctions";
import DescriptionBox from "../components/profileComponents/DescriptionBox";
import CountersBox from "../components/profileComponents/CountersBox";
import AnagraphicBox from "../components/profileComponents/AnagraphicBox";
import FollowCounterBox from "../components/profileComponents/FollowCounterBox";
import { useEffect, useState } from "react";
import { getRelationshipCheck, getSubCheck, getUserAmplify } from "../libs/backendSimulation";
import LoadingPage from "../components/appComponents/LoadingPage";
import SubsBox from "../components/profileComponents/SubsBox";
import PostsTab from "../components/profileComponents/PostsTab";
import { useParams } from "react-router-dom";

function Profile (){

    const {nickname} = useParams();

    const theme = useTheme();
    const bordersColor = lightenHexColor(theme.palette.primary.dark, 120);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [user, setUser] = useState(null);
    const [followingCheck, setFollowingCheck] = useState(false);
    const [followerCheck, setFollowerCheck] = useState(false);
    const [privacyBypass, setPrivacyBypass] = useState(false);
    const [subCheck, setSubCheck] = useState(false);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{

                //Ricezione dati dal backend dell'utente, null se sei bloccato o l'utente non esiste
                //oggetto user se l'utente esiste e non ti ha bloccato
                const userData = await getUserAmplify(nickname);
                //Simulazione di un ritardo nella ricezione dati di 3s con setTimeout per mostrare il caricamento.
                setTimeout(() => {if(userData !== null){
                    setUser(userData)
                    setBlocked(false);
                }else{
                    setBlocked(true);
                }},0);

                //Ricezione dei dati dalla relationship table
                const {checkFollowing, checkFollower} = await getRelationshipCheck();
                setFollowingCheck(checkFollowing);
                setFollowerCheck(checkFollower);

                //Ricezione dei dati dalla subscription table
                const subData = await getSubCheck();
                setSubCheck(subData);

            }catch(error){
                console.error('Errore nella richiesta al backend:', error);
            }
        };
        fetchData();
    },[nickname]);

    //Ricevuti i dati dal backend imposta se l'utente ha accesso ai dati.
    useEffect(() => {
        if(user){
            setLoadingProfile(false);
            if(user.privacy === 'public'){
                setPrivacyBypass(true);
            }else{
                if(user.privacy === 'private' && followingCheck){
                    setPrivacyBypass(true);
                }else{
                    setPrivacyBypass(false);
                }   
            }
        }else if(blocked){
            setLoadingProfile(false);
        }
    },[user, followingCheck, blocked]);

    //In attesa che vengano ricevuti i dati dell'utente dal backend.
    if(loadingProfile){
        return(<LoadingPage/>)
    }else{
        window.scrollTo({top: 0})
    }

    //Se ricevuti i dati utente l'utente non viene trovato o sei stato bloccato.
    if(blocked){
        return <h1>Utente non trovato</h1>
    }

    return(
        <>
        <div className="main-container">
            <div className="profile-left-container">
                <h1>Left</h1>
            </div>
            <div className="profile-center-container" style={{borderInline: `solid 2px ${lightenHexColor(theme.palette.primary.dark, 120)}`}}>
                <div className="profile-center-top-container">
                    <div className="profile-cover-container" style={{borderBottom: `solid 5px ${lightenHexColor(theme.palette.primary.dark, 120)}`,borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", overflow: "hidden"}}>
                        <img alt="cover" src={coverImage} />
                    </div>
                    <div className="profile-avatar-buttons-container">
                        <div className="profile-avatar-container">
                            <Avatar style={{width: "100%", height: "100%", border: `solid 3px ${lightenHexColor(theme.palette.primary.dark, 120)}`}} src={avatarImage}/>
                        </div>
                        <div className="profile-tools-container">
                            <div className="profile-tools-top-container">
                                <AnagraphicBox username={user.username} nickname={user.nickname}/>
                                <FollowCounterBox counters={user.counters}/>
                            </div>
                            <ButtonsGrid username={user.username} nickname={user.nickname} followingCheck={followingCheck} subCheck={subCheck}/>
                        </div>
                    </div>
                </div>
                <div className="profile-center-bottom-container">
                    <CountersBox counters={user.counters}/>
                    <DescriptionBox text={user.description}/>
                    <SubsBox user={user}/>
                    <PostsTab user={user}/>
                </div>
            </div>
            <div className="profile-right-container">
                <h1>Right</h1>
            </div>
        </div>
        </>
    )
}

export default Profile;