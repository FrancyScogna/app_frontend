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
    const [blocked, setBlocked] = useState(false);
    const [user, setUser] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);
    const [followingCheck, setFollowingCheck] = useState(false);
    const [followCheck, setFollowCheck] = useState(false);
    const [subscribedCheck, setSubscribedCheck] = useState(false);

    useEffect(() => {
        if(authUser && nickname === authUser.nickname){
            setUser(authUser);
            setIsGuestProfile(false);
            setLoadingProfile(false);
        } else {
            setIsGuestProfile(true);
            async function getGuestProfile(){
                try {
                    await getUserProfile(nickname).then(userData => {
                        if(userData.blocked || !userData.user){
                            setBlocked(true);
                            setUser(null);
                            setLoadingProfile(false);
                            setFollowCheck(false);
                            setFollowingCheck(false);
                            setSubscribedCheck(false);
                        } else {
                            setBlocked(false);
                            setUser(userData.user);
                            setLoadingProfile(false);
                            setFollowCheck(userData.follow);
                            setFollowingCheck(userData.following);
                            setSubscribedCheck(userData.subscribed);
                        }
                    })
                } catch(error){
                    console.log(error);
                    setLoadingProfile(false);
                }
            }
            getGuestProfile();
        }
    }, [nickname, authUser]);

    console.log(nickname)

    // In attesa che vengano ricevuti i dati dell'utente dal backend.
    if(loadingProfile){
        return <LoadingPage />;
    }

    // Se l'utente non viene trovato o sei stato bloccato.
    if(blocked || userNotFound){
        return <h1>Utente non trovato</h1>;
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-center-bottom-container">
                    <FollowCounterBox counters={user.counters}/>
                    <ButtonsGrid username={user.username} nickname={user.nickname} follow={followCheck} subscribed={subscribedCheck}/>
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