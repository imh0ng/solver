import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // 수정된 부분

const ProfileContainer = styled.div`
  height: 80vh;
  position: absolute;
  left: 60%;
  transform: translateX(-60%);
  display: flex;
  flex-direction: row;
`;

const ProfileCardContainer = styled.div`
  width: 470px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 5px 15px 0px #888;
  border-radius: 30px;
  background-color: #fbfdff;
  margin-top: 20px;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 25px;
`;

const ProfileImg = styled.img`
  background-color: lightgrey;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;

const ImgButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImgButton = styled.button`
  width: 70px;
  height: 20px;
  margin-top: 15px;
  border-radius: 50px;
  border-style: none;
  font-size: 10px;
  background-color: #b8c5d4;
  color: #000000;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px #888;
`;

const LogOutButton = styled.button`
  width: 70px;
  height: 20px;
  margin-top: 15px;
  border-radius: 50px;
  border-style: none;
  font-size: 10px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px #888;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 40px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserName = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 29px;
  width: 100px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0;
`;

const NameButton1 = styled.button`
  text-align: center;
  width: 40px;
  height: 15px;
  border-radius: 50px;
  border-style: none;
  font-size: 10px;
  padding: 0;
  background-color: #b8c5d4;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px #888;
`;

const NameBuuton2 = styled.button`
  text-align: center;
  width: 40px;
  height: 15px;
  border-radius: 50px;
  border-style: none;
  font-size: 10px;
  margin-left: 5px;
  background-color: #b8c5d4;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px #888;
`;

const UserEmail = styled.p`
  margin-top: 0;
  word-wrap: break-word;
  width: 150px;
`;

const UserState = styled.p`
  margin: 0;
  width: 150px;
`;

const BookMarkBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  height: 200px;
  overflow-y: auto;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const ButtonBox2 = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 30px;
  margin-top: 20px;
`;

const BookMarkButton = styled.button`
  width: 150px;
  height: 35px;
  margin-top: 15px;
  border-radius: 10px 0px 0px 10px;
  border-style: none;
  font-size: 15px;
  background-color: ${(props) => (props.isActive ? "#90A5CD" : "#C7CBD1")};
  color: white;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px #888;
  &:hover {
    background-color: #90a5cd;
  }
`;

const ListPostBox = styled.div`
  margin: 0;
  padding: 0;
`;

const CommentButton = styled.button`
  width: 150px;
  height: 35px;
  margin-top: 15px;
  border-radius: 0px 10px 10px 0px;
  border-style: none;
  font-size: 15px;
  background-color: ${(props) => (props.isActive ? "#90A5CD" : "#C7CBD1")};
  color: white;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px #888;
  &:hover {
    background-color: #90a5cd;
  }
`;

const PostContainer = styled.div`
  width: 400px;
  margin: 30px;
  margin-left: 100px;
  margin-right: 0;
`;

const PostContainerTitle = styled.p`
  display: inline-block;
  background-color: #90a5cd;
  color: white;
  border-radius: 10px;
  padding: 5px;
  font-size: 15px;
`;

const PostCardBox = styled.div`
  margin: 20px;
  margin-left: 0;
`;

const PostCardTitle = styled.h2`
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  color: #525252;
`;

const PostDate = styled.p`
  margin: 0;
  color: #5b5858;
  font-size: small;
`;

const UserNameInput = styled.input`
  font-size: 23px;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: 1px solid #b8c5d4;
  width: 90px;
  word-wrap: break-word;
`;

const MyPage = () => {
    const userid = localStorage.getItem("userID");
    const [MyPosts, setMyPosts] = useState([]);
    const [MyBookMark, setMyBookMark] = useState([]);
    const [MyComment, setMyComment] = useState([
      {
        title: "백준 1002번 터렛 - 초보 개발자 이야기",
        comments: "잘 보고 갑니다~!!",
        date: "24.07.04",
      },
      { title: "백준 952번 풀이", comments: "안녕하세요", date: "24.07.04" },
      {
        title: "[C]백준 1002번 터렛",
        comments: "이 부분은 이해가 잘 안 갑니다",
        date: "24.07.05",
      },
      { title: "백준에서 가장 많이 풀린", comments: "GOOD", date: "24.07.05" },
    ]);
    const [activeTab, setActiveTab] = useState("posts");
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [selectedImage, setSelectedImage] = useState("/defaultImage.png");
  
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const storedUserName = localStorage.getItem("userName");
  
      if (!accessToken) {
        navigate("/login");
      } else {
        setUserName(storedUserName || "닉네임");
        setNewUserName(storedUserName || "닉네임");
  
        axiosInstance
          .get(`/blog/posts`, {
            params: {
              isMine: true,
              SortBy: "latest",
              PerPages: 10,
            },
          })
          .then((res) => {
            setMyPosts(res.data.posts);
          })
          .catch((e) => {
            console.log(e);
          });
  
        axiosInstance
          .get(`/blog/bookmarks/`, {
            params: {
              user_id: userid,
            },
          })
          .then((res) => {
            setMyBookMark(res.data);
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, [navigate]);
  
    const handlePostClick = (postId) => {
      navigate(`/Post/${postId}`);
    };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = async () => {
      try {
        const response = await axiosInstance.put(`/users/profiles/${userid}/`, {
            modified_name: newUserName,
        });
        if (response.status === 200) {
          setUserName(newUserName);
          localStorage.setItem("userName", newUserName); // 로컬 스토리지에 저장
          setIsEditing(false);
        } else {
          console.error("이름 변경 실패:", response);
        }
      } catch (error) {
        console.error("이름 변경 실패:", error);
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(URL.createObjectURL(file));
      }
    };
  
    const handleButtonClick = () => {
      document.getElementById("file").click();
    };
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const handleLogoutClick = async () => {
      try {
        await axiosInstance.get(`/users/logout`);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    };
  
    return (
      <ProfileContainer>
        <ProfileCardContainer>
          <ProfileBox>
            <ImgBox>
              <ProfileImg src={selectedImage} alt=" " />
              <ImgButtonBox>
                <ImgButton onClick={handleButtonClick}>사진 수정</ImgButton>
                <HiddenFileInput
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </ImgButtonBox>
            </ImgBox>
            <TextBox>
              <NameBox>
                <ButtonBox>
                  {isEditing ? (
                    <UserNameInput
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  ) : (
                    <UserName>{userName}</UserName>
                  )}
                  {isEditing ? (
                    <NameBuuton2 onClick={handleSaveClick}>완료</NameBuuton2>
                  ) : (
                    <NameButton1 onClick={handleEditClick}>수정</NameButton1>
                  )}
                </ButtonBox>
              </NameBox>
              <UserEmail>example@gmail.com</UserEmail>
              <UserState>글 작성 : 20회</UserState>
              <UserState>댓글 작성 : 20회</UserState>
              <LogOutButton onClick={handleLogoutClick}>로그아웃 </LogOutButton>
            </TextBox>
          </ProfileBox>
          <ButtonBox2>
            <BookMarkButton
              isActive={activeTab === "bookmarks"}
              onClick={() => handleTabClick("bookmarks")}
            >
              북마크한 글
            </BookMarkButton>
            <CommentButton
              isActive={activeTab === "comments"}
              onClick={() => handleTabClick("comments")}
            >
              내가 쓴 댓글
            </CommentButton>
          </ButtonBox2>
          <BookMarkBox>
            {activeTab === "bookmarks" && (
              <ContentsList>
                {MyBookMark.length > 0 ? (
                  MyBookMark.map((post) => (
                    <ListPostBox
                      key={post.post.id}
                      onClick={() => handlePostClick(post.id)}
                    >
                      <p>{post.post.title}</p>
                      <PostDate>{post.post.date}</PostDate>
                    </ListPostBox>
                  ))
                ) : (
                  <div>No posts found</div>
                )}
              </ContentsList>
            )}
            {activeTab === "comments" && (
              <ContentsList>
                {MyComment.length > 0 ? (
                  MyComment.map((comment) => (
                    <ListPostBox
                      key={comment.id}
                      onClick={() => handlePostClick(comment.id)}
                    >
                      <p>{comment.title}</p>
                      <p>{comment.comments}</p>
                      <PostDate>{comment.date}</PostDate>
                    </ListPostBox>
                  ))
                ) : (
                  <div>No comments found</div>
                )}
              </ContentsList>
            )}
          </BookMarkBox>
        </ProfileCardContainer>
        <PostContainer>
          <PostContainerTitle>내가 쓴 글 살펴보기</PostContainerTitle>
          {MyPosts.length > 0 ? (
            MyPosts.map((post) => (
              <PostCardBox key={post.id} onClick={() => handlePostClick(post.id)}>
                <PostCardTitle>{post.title}</PostCardTitle>
                <PostDate>{post.date}</PostDate>
              </PostCardBox>
            ))
          ) : (
            <div>No posts found</div>
          )}
        </PostContainer>
      </ProfileContainer>
    );
  };
  
  export default MyPage;