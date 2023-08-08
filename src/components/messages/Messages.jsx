import React, { useState, useEffect, useRef } from "react";
import "./Messages.scss";
import { BiSend, BiSearch } from "react-icons/bi";
import { profile } from "../../assests";
import ScrollToBottom from "react-scroll-to-bottom";
import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    GetAllUser,
    CreateChatConnection,
    addMessage,
    getUserInfo,
    clearErrors,
    clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";
import { db, storage } from "./../../firebase";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

const Messages = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        records,
        message,
        errors,
        chatConnection,
        sessionExpireError,
        loading,
        userInfo,
    } = useSelector((state) => state.userReducer);
    const [msg, setMsg] = useState("");
    const [showContact, setshowContact] = useState(true);
    const [messages, setMessages] = useState([]);
    const [searchText, setSearchText] = useState("");

    const messageHandler = (event) => {
        setMsg(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const messageData = {
            id: Math.random().toString(),
            message: msg,
        };
        setMessages((preMessages) => {
            return [...preMessages, messageData];
        });
        setMsg("");
    };

    useEffect(() => {
        if (chatConnection._id) {
            const collectionRef = collection(db, "messages");
            const q = query(
                collectionRef,
                where("conversationId", "==", chatConnection._id),
                orderBy("createdAt")
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        _id: doc.id,
                    }))
                );
            });

            return () => unsubscribe();
        }
    }, [chatConnection]);

    useEffect(() => {
        if (errors.length > 0) {
            toast.error(errors);
            dispatch(clearErrors());
        }
        if (sessionExpireError != "") {
            toast.error(sessionExpireError);
            dispatch(clearErrors());
            setTimeout(() => navigate("/"), 2000);
        }
        if (message != "") {
            toast.success(message);
            dispatch(clearMessages());
        }
    }, [errors, message, sessionExpireError]);
    useEffect(() => {
        dispatch(GetAllUser(true));
        setSearchText("");
    }, []);
    const user = JSON.parse(localStorage.getItem("admin"));
    let loginUser = user._id;
    const hanldeChatMessage = () => {
        let result = {
            message: msg,
            conversationId: chatConnection?._id ? chatConnection._id : "",
            senderId: loginUser,
        };
        dispatch(addMessage(result));
    };
    return (
        <>
            <div className="chat">
                <div className="chat-container">
                    {showContact ? (
                        <div className="chat-container-user">
                            <div className="chat-container-user-search">
                                <input
                                    type="text"
                                    placeholder="Search messages"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <BiSearch className="chat-container-user-search-icon" />
                            </div>
                            {loading ? (
                                <Puff
                                    height="60"
                                    width="60"
                                    radius="6"
                                    color="black"
                                    ariaLabel="loading"
                                    wrapperStyle
                                    wrapperClass
                                />
                            ) : records.length > 0 ? (
                                records
                                    .filter((data) =>
                                        (data.firstName + " " + data.lastName)
                                            .toLowerCase()
                                            .startsWith(
                                                searchText.toLowerCase()
                                            )
                                    )
                                    .map((data, ind) => {
                                        return (
                                            <>
                                                <UserMessage
                                                    key={ind}
                                                    profile={
                                                        data.photoPath
                                                            ? data.photoPath
                                                            : profile
                                                    }
                                                    name={`${
                                                        data.firstName &&
                                                        data.firstName
                                                    } ${
                                                        data.lastName &&
                                                        data.lastName
                                                    }`}
                                                    userId={data._id}
                                                />
                                            </>
                                        );
                                    })
                            ) : (
                                <h1>No data found</h1>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    {chatConnection._id ? (
                        <div className="chat-container-feed">
                            <div className="chat-container-feed-profile space-between">
                                <div className="chat-container-feed-profile-flex  align-item-center">
                                    <div
                                        className="chat-container-feed-profile-menuicon"
                                        onClick={() =>
                                            setshowContact(!showContact)
                                        }
                                    >
                                        <TfiMenuAlt />
                                    </div>
                                    <img
                                        src={
                                            userInfo.photoPath
                                                ? userInfo.photoPath
                                                : profile
                                        }
                                        alt="profile"
                                    />
                                    <h3>{`${
                                        userInfo.firstName && userInfo.firstName
                                    } ${
                                        userInfo.lastName && userInfo.lastName
                                    }`}</h3>
                                </div>

                                {showContact ? (
                                    <div
                                        className="chat-container-feed-profile-menuicon-cross"
                                        onClick={() =>
                                            setshowContact(!showContact)
                                        }
                                    >
                                        <RxCross2 />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="chat-container-feed-box">
                                <ScrollToBottom>
                                    {messages.map((msg) =>
                                        msg.senderId != loginUser ? (
                                            <Message
                                                class="recieve-message"
                                                key={msg.id}
                                                text={msg.message}
                                            />
                                        ) : (
                                            <Message
                                                class="send-message"
                                                key={msg.id}
                                                text={msg.message}
                                            />
                                        )
                                    )}
                                </ScrollToBottom>
                            </div>
                            <div className="chat-container-feed-input">
                                <form onSubmit={submitHandler}>
                                    <input
                                        type="text"
                                        placeholder="Type a message"
                                        value={msg}
                                        onChange={messageHandler}
                                    />
                                    <button
                                        className="message-send-btn "
                                        onClick={() => hanldeChatMessage()}
                                    >
                                        <BiSend />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <center
                            style={{
                                color: "black",
                                margin: "18%",
                            }}
                        >
                            <h1>Click On Any User For Chat</h1>
                        </center>
                    )}
                </div>
            </div>
        </>
    );
};

export default Messages;

const UserMessage = (props) => {
    const dispatch = useDispatch();
    const handleChatConnection = (userId) => {
        let result = { member: userId };
        dispatch(CreateChatConnection(result));
        dispatch(getUserInfo(userId));
    };
    return (
        <>
            <div
                className="usermessage"
                onClick={() => handleChatConnection(props.userId)}
            >
                <div className="usermessage-container">
                    <div className="usermessage-container-flex">
                        <div className="usermessage-container-image">
                            <img
                                crossOrigin="true"
                                src={props.profile}
                                alt="profile"
                            />
                        </div>
                        <div className="usermessage-container-name">
                            <h3>{props.name}</h3>
                            {/* <p>{props.message}</p> */}
                        </div>
                    </div>
                    <div className="usermessage-container-messages">
                        {/* <p>{props.newmsg}</p> */}
                    </div>
                </div>
            </div>
        </>
    );
};

const Message = (props) => {
    const messagesEndRef = useRef();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.children]);

    return (
        <>
            <div className={`message ${props.class}`}>
                <div className="message-container" ref={messagesEndRef}>
                    <p>{props.text}</p>
                </div>
            </div>
        </>
    );
};
