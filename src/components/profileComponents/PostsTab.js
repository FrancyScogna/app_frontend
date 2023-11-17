import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CircularProgress, Grid, Tab, Tabs, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { formatCount } from "../../libs/utilFunctions";
import { getUserPost } from "../../libs/backendSimulation";
import handleViewport from "react-in-viewport";
import { customStyles } from "./styles/PostsTab";
import { style } from "@mui/system";

function PostsTab({user}) {

    const theme = useTheme();
    const styles = customStyles(theme);

    const swiperRef = useRef(null);
    const [page, setPage] = useState("0");

    const handleChangeValue = (event, newValue) => {
        setPage(newValue);
        swiperRef.current.swiper.slideTo(newValue, 500, false); // 500 è la durata dell'animazione in millisecondi
    };

    const onSlideChange = (swiper) => {
        setPage(swiper.realIndex.toString());
    };

    const allMedia = user.counters.vidsCount+user.counters.picsCount+user.counters.clipsCount;
    const tabList = [
        {value: "0", label: `Tutti (${formatCount(allMedia)})`},
        {value: "1", label: `Video (${formatCount(user.counters.vidsCount)})`},
        {value: "2", label: `Foto (${formatCount(user.counters.picsCount)})`},
        {value: "3", label: `Clip (${formatCount(user.counters.clipsCount)})`},
    ]

    const [postsList, setPostsList] = useState([]);
    const [index, setIndex] = useState(0);
    const pagination = 20;

    async function fetchData(){
        const postsData = await getUserPost(index, pagination);
        setIndex(index+pagination)
        setPostsList((prevItems) => [...prevItems, ...postsData]);
        if(postsData.length === 0){
            setDisableViewPort(true);
        }else{
            setDisableViewPort(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    const [disableViewport, setDisableViewPort] = useState(false)
    const Block = ({forwardedRef}) => {
        return (
            <div ref={forwardedRef} style={styles.poststab_viewport_div}>
                <CircularProgress style={styles.poststab_viewport_circularprogress} />
            </div>
        )
      };

    const ViewportBlock = handleViewport(Block);

    return (
        <div style={styles.poststab_main_div}>
            <TabContext value={page}>
                <TabList onChange={handleChangeValue} centered>
                    {tabList.map((item) => (
                        <Tab key={item.value} value={item.value} label={item.label} style={styles.poststab_tab_text}/>
                    ))}
                </TabList>
                <Swiper
                    ref={swiperRef}
                    slidesPerView={1}
                    onSlideChange={onSlideChange}
                    style={styles.poststab_swiper_main}
                >
                    {tabList.map((item) => (
                        <SwiperSlide key={item.value}>
                            <Grid container>
                            {
                            //Simulazione delle anteprime dei post.
                            postsList.map((item, index) => (
                                <Grid key={index} item xs={4}>
                                    <div style={{border: "1px solid black", backgroundColor: "gray", width: "100%", paddingBottom: "150%"}}>
                                        Post {item.key}
                                    </div>
                                </Grid>
                            ))}
                            {!disableViewport && <ViewportBlock onEnterViewport={fetchData}/>}
                            </Grid>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </TabContext>
        </div>
    );
}

export default PostsTab;
