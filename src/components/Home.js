/* eslint-disable */
import Viewers from "./Viewer";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { useNavigate } from "react-router";

const Home = props => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const navigation = useNavigate();
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    // this prevents user from accessing the "/home" route before logging in
    if (!userName) {
      console.log("No user found, redirecting to SignIn page");
      navigation("/");
      return; /*this prevents the further lines from execution else it will throw error,
      as we don't have permission to retrieve data from firebase in case of no users*/
    }

    db.collection("movies").onSnapshot(snapshot => {
      // gets all documents and iterate over them using map()
      snapshot.docs.map(doc => {
        // console.log(doc.data());
        // type is an attribute of the object
        switch (doc.data().type) {
          case "recommend":
            // because id is not included in document/object
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
          default:
            break;
        }
      });
      // console.log("executes later");
      // this block is fetching data from db so it's important to put dispatch within this block

      //after getting the data from database, store it into Redux store
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });
    // console.log("executes first");
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
    ${
      "" /* We want the container element to be underneath the slider component hence we have specified z-index in negative */
    }
  }
`;

export default Home;
