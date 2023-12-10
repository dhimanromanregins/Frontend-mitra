import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CommentScreen = ({ navigation, route }) => {
  const { key, video_id } = route.params;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [replyingToIndex, setReplyingToIndex] = useState(null);
  const [replyInput, setReplyInput] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [replyEditingIndex, setReplyEditingIndex] = useState(null);
  const [editedReplyText, setEditedReplyText] = useState({});
  const [hiddenReplies, setHiddenReplies] = useState({});
  const [uid, setUid] = useState("");
  const [comment_count, setCount] = useState("");
  const [comment_id, setCommentId] = useState("");
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState("");

  // console.log("id", uid);
  // console.log("video_dwid", video_id);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUid(JSON.parse(value));
      }
    } catch (e) {
      console.error("Error retrieving UID", e);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://sspmitra.in/comment-count/?video_id=${video_id}`);
      setCount(response.data.comment_count);
  
      const updatedComments = [];
      for (const comment of response.data.comments) {
        try {
          const userDetailsResponse = await axios.get(`https://sspmitra.in/get-comment-userdetails/?comment_id=${comment.id}`);
          
          const updatedComment = {
            ...comment,
            user_name: userDetailsResponse.data.user_name,
            user_profile_photo: userDetailsResponse.data.user_profile_photo,
            replies: [], // Initialize empty array for replies
          };
          updatedComments.push(updatedComment);
  
          if (comment.replies && comment.replies.length > 0) {
            for (const reply of comment.replies) {
              const replyDetailsResponse = await axios.get(`https://sspmitra.in/get-comment-userdetails/?comment_id=${reply.id}`);
              
              const updatedReply = {
                ...reply,
                user_name: replyDetailsResponse.data.user_name,
                user_profile_photo: replyDetailsResponse.data.user_profile_photo,
              };
              updatedComment.replies.push(updatedReply);
            }
          }
        } catch (userDetailsError) {
          console.error("Error fetching user details for comment:", userDetailsError);
          updatedComments.push(comment); // Push the original comment in case of an error
        }
      }
  
      setComments(updatedComments);
  
      if (response.data.comments && response.data.comments.length > 0) {
        const commentId = response.data.comments[0].id; // Accessing the id of the first comment
        setCommentId(commentId);
        console.log("ID from comment: ", commentId);
        // Now you can set the ID state variable or use it as needed
      }
      console.log("count:", response.data.comment_count);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    
  };
  

  

  const addComment = async () => {
    if (commentInput.trim() !== "") {
      try {
        const response = await axios.post(`https://sspmitra.in/comment/`, {
          text: commentInput,
          user: uid, // Assuming uid is retrieved from AsyncStorage
          video: video_id,
        });
        console.log(response);
        fetchComments();
        // Update comments after adding the new comment
        setComments([...comments, response.data]);
        setCommentInput("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const editComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].isEditing = true;
    setEditedCommentText(updatedComments[index].text);
    setEditingCommentIndex(index);
    setComments(updatedComments);
  };

  const saveEditedComment = async (index) => {
    const updatedComments = [...comments];
    const commentToEdit = updatedComments[index];
    try {
      const response = await axios.patch(
        `https://sspmitra.in/comments/edit/?comment_id=${commentToEdit.id}`,
        {
          text: editedCommentText,
        }
      );
      updatedComments[index].text = response.data.text; // Use the text from the response
      updatedComments[index].isEditing = false;
      setEditingCommentIndex(null);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const deleteComment = async (comment_id) => {
    try {
      const response = await axios.delete(
        `https://sspmitra.in/comments/delete/?comment_id=${comment_id}`
      );
      console.log("Comment deleted:", response.data);

      setComments(comments.filter((comment) => comment.id !== comment_id));
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const addReply = async (index) => {
    if (replyInput[index] && replyInput[index].trim() !== "") {
      try {
        const response = await axios.post(`https://sspmitra.in/comment/`, {
          parent_comment: comments[index].id,
          text: replyInput[index],
          user: uid, // Assuming uid is retrieved from AsyncStorage
          video: video_id,
        });
        const updatedComments = [...comments];
        updatedComments[index].replies = updatedComments[index].replies || [];
        updatedComments[index].replies.push(response.data);
        setComments(updatedComments);
        setReplyInput({ ...replyInput, [index]: "" });
        setReplyingToIndex(null);
        setShowReplies({ ...showReplies, [index]: true });
        fetchComments();
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  const editReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].isEditing = true;
    setEditedReplyText({
      ...editedReplyText,
      [replyIndex]: updatedComments[commentIndex].replies[replyIndex].text,
    });
    setReplyEditingIndex(replyIndex);
    setComments(updatedComments);

  };

  const saveEditedReply = async (commentIndex, replyIndex) => {
    try {
      const comment = comments[commentIndex];
      const reply = comment.replies[replyIndex];

      const response = await axios.patch(
        `https://sspmitra.in/comments/edit/?comment_id=${reply.id}`,
        {
          text: editedReplyText[replyIndex],
        }
      );

      const updatedComments = comments.map((c, index) => {
        if (index === commentIndex) {
          const updatedReplies = c.replies.map((r, replyIdx) => {
            if (replyIdx === replyIndex) {
              return {
                ...r,
                text: response.data.text, // Update the text from the API response
              };
            }
            return r;
          });
          return {
            ...c,
            replies: updatedReplies,
          };
        }
        return c;
      });

      setComments(updatedComments);
      setReplyEditingIndex(null);
    } catch (error) {
      console.error("Error editing reply:", error);
      // Handle error state or notification to the user
    }
  };

  const deleteReply = async (commentIndex, replyIndex) => {
    try {
      const comment = comments[commentIndex];
      const reply = comment.replies[replyIndex];

      // Make an API call to delete the reply using its ID
      await axios.delete(
        `https://sspmitra.in/comments/delete/?comment_id=${reply.id}`
      );

      // Update the state to reflect the deleted reply
      const updatedComments = comments.map((c, idx) => {
        if (idx === commentIndex) {
          const updatedReplies = c.replies.filter(
            (r, rIdx) => rIdx !== replyIndex
          );
          return { ...c, replies: updatedReplies };
        }
        return c;
      });

      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting reply:", error);
      // Handle error state or notify the user about the issue
    }
  };

  const toggleRepliesVisibility = (index) => {
    setHiddenReplies({ ...hiddenReplies, [index]: !hiddenReplies[index] });
  };

  const renderComment = (comment, commentIndex) => {
    const isAuthor = (userId) => userId === uid;
    return (
      <View
        key={commentIndex}
        style={{ flexDirection: "row", marginBottom: 10 }}
      >
        <View
          style={{
            marginRight: 10,
            width: 40,
            height: 40,
            borderWidth: 0.2,
            borderRadius: 100,
          }}
        >
          {comment.user_profile_photo && comment.user_profile_photo !== ""  ? (
            <Image
              source={{ uri: comment.user_profile_photo }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
            />
          ) : (
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
              source={require("../../assets/man.png")}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
            {comment.user_name}
            </Text>
            {comment.isEditing ? (
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  padding: 5,
                  backgroundColor: "white",
                  elevation: 1,
                }}
                multiline={true}
                value={editedCommentText}
                onChangeText={(text) => setEditedCommentText(text)}
              />
            ) : (
              <Text>{comment.text}</Text>
              
            )}
            
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            {comment.isEditing ? (
              <TouchableOpacity
                onPress={() => saveEditedComment(commentIndex)}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "#3897f0", fontWeight: "bold" }}>
                  Done
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => editComment(commentIndex)}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "#3897f0", fontWeight: "bold" }}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deleteComment(comment.id)}>
              <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
            {replyingToIndex !== commentIndex ? (
              <TouchableOpacity
                onPress={() => setReplyingToIndex(commentIndex)}
                style={{ marginHorizontal: 10 }}
              >
                <Text style={{ color: "#3897f0", fontWeight: "bold" }}>
                  Reply
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}
              >
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 5,
                    padding: 5,
                    backgroundColor: "white",
                    elevation: 1,
                    width: Dimensions.get("window").width * 0.5,
                  }}
                  multiline={true}
                  placeholder="Reply to this comment..."
                  value={replyInput[commentIndex]}
                  onChangeText={(text) =>
                    setReplyInput({ ...replyInput, [commentIndex]: text })
                  }
                />
                <TouchableOpacity
                  onPress={() => addReply(commentIndex)}
                  style={{ marginRight: 10 }}
                >
                  <Text
                    style={{ color: "#3897f0", fontWeight: "bold", padding: 5 }}
                  >
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {comment.replies && comment.replies.length > 0 && (
            <View>
              <TouchableOpacity
                onPress={() => toggleRepliesVisibility(commentIndex)}
                style={{ marginTop: 5 }}
              >
                {hiddenReplies[commentIndex] ? (
                  <Text style={{ color: "#3897f0", fontWeight: "bold" }}>
                    Hide Replies
                  </Text>
                ) : (
                  <Text style={{ color: "#3897f0", fontWeight: "bold" }}>
                    Show Replies
                  </Text>
                )}
              </TouchableOpacity>
              {hiddenReplies[commentIndex] && (
                <>
                  {comment.replies.map((reply, replyIndex) => (
                    <View key={replyIndex} style={{ marginTop: 5 }}>
                      <View
                        style={{
                          marginRight: 10,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            marginRight: 10,
                            width: 40,
                            height: 40,
                            borderWidth: 0.2,
                            borderRadius: 100,
                          }}
                        >
                          {reply.user_profile_photo && reply.user_profile_photo!== "" ? (
                            <Image
                              source={{ uri: reply.user_profile_photo }}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                              }}
                            />
                          ) : (
                            <Image
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100,
                              }}
                              source={require("../../assets/man.png")}
                            />
                          )}
                        </View>
                        <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                        {reply.user_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 10,
                          marginTop: 5,
                        }}
                      >
                        {replyEditingIndex === replyIndex ? (
                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <TextInput
                              style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: "gray",
                                borderRadius: 5,
                                padding: 5,
                                backgroundColor: "white",
                                elevation: 1,
                              }}
                              multiline={true}
                              value={editedReplyText[replyIndex]}
                              onChangeText={(text) =>
                                setEditedReplyText({
                                  ...editedReplyText,
                                  [replyIndex]: text,
                                })
                              }
                            />
                            <TouchableOpacity
                              onPress={() =>
                                saveEditedReply(commentIndex, replyIndex)
                              }
                              style={{ marginRight: 10 }}
                            >
                              <Text
                                style={{
                                  color: "#3897f0",
                                  fontWeight: "bold",
                                  padding: 5,
                                }}
                              >
                                Done
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={{ flex: 1 }}>
                            <Text>{reply.text}</Text>
                            <TouchableOpacity
                              onPress={() =>
                                editReply(commentIndex, replyIndex)
                              }
                              style={{ marginTop: 5 }}
                            >
                              <Text
                                style={{ color: "#3897f0", fontWeight: "bold" }}
                              >
                                Edit
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        <TouchableOpacity
                          onPress={() => deleteReply(commentIndex, replyIndex)}
                        >
                          <Text style={{ color: "red", fontWeight: "bold" }}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };
  
  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    getUid();
  }, [uid]);
 

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems:"center"}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="red" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft:40, color:"red"  }}>
            Comments {comment_count}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            marginTop:20
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
              padding: 5,
              backgroundColor: "white",
              elevation: 1,
            }}
            placeholder="Add a comment..."
            value={commentInput}
            onChangeText={(text) => setCommentInput(text)}
          />
          <TouchableOpacity onPress={addComment} style={{ padding: 10 }}>
            <Ionicons name="send" size={24} color="#3897f0" />
          </TouchableOpacity>
        </View>
        {comments.map((comment, commentIndex) =>
          renderComment(comment, commentIndex)
        )}
      </ScrollView>
    </View>
  );
};

export default CommentScreen;
