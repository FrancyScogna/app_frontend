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
import { getRelationshipCheck, getSubCheck, getUserAmplify, getUserProfile } from "../libs/backendSimulation";
import LoadingPage from "../components/appComponents/LoadingPage";
import SubsBox from "../components/profileComponents/SubsBox";
import PostsTab from "../components/profileComponents/PostsTab";
import { useParams } from "react-router-dom";

function Profile ({authUser}){

    const {nickname} = useParams();

    const theme = useTheme();
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [isGuestProfile, setIsGuestProfile] = useState(false);
    const [followingCheck, setFollowingCheck] = useState(false);
    const [followCheck, setFollowCheck] = useState(false);
    const [subscribedCheck, setSubscribedCheck] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if(nickname === authUser.nickname){
            setIsGuestProfile(false);
        }else{
            setIsGuestProfile(true);
        }
    },[nickname, authUser]);

    async function getGuestProfile(){
        try{
            const userData = await getUserProfile(nickname);
            if(userData.blocked){
                setBlocked(true);
                setUser(null);
                setFollowCheck(false);
                setFollowingCheck(false);
                setSubscribedCheck(false);
                setLoadingProfile(false);
            }else{
                setBlocked(false);
                setUser(userData.user);
                setFollowCheck(userData.follow);
                setFollowingCheck(userData.following);
                setSubscribedCheck(userData.subscribed);
                setLoadingProfile(false);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(isGuestProfile){
            getGuestProfile();
        }else{
            setUser(authUser);
            setLoadingProfile(false);
        }
    },[isGuestProfile])

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
                            <ButtonsGrid username={user.username} nickname={user.nickname} follow={followCheck} subscribed={subscribedCheck}/>
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