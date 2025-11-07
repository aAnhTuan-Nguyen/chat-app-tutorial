import Friend from "../models/Friend.js"
import User from "../models/User.js"
import FriendRequest from "../models/FriendRequest.js"

export const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId, message } = req.body

    const senderId = req.user._id

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Không thể gửi lời mời kết bạn cho chính mình" })
    }

    // kiểm tra người dung có tồn tại không
    const userExists = await User.findById(receiverId)
    if (!userExists) {
      return res.status(404).json({ message: "Người dùng không tồn tại" })
    }

    // kiểm tra đã là bạn bè chưa và có yêu cầu kết bạn đang chờ không
    let userId = senderId.toString()
    let friendId = receiverId.toString()

    if (userId > friendId) {
      ;[userId, friendId] = [friendId, userId]
    }

    const [alreadyFriends, existingRequest] = await Promise.all([
      Friend.findOne({ userId, friendId }),
      FriendRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }),
    ])

    if (alreadyFriends) {
      return res.status(400).json({ message: "Đã là bạn bè" })
    }
    if (existingRequest) {
      return res.status(400).json({ message: "Đã có yêu cầu kết bạn đang chờ" })
    }

    // tạo yêu cầu kết bạn
    const friendRequest = await FriendRequest.create({
      senderId,
      receiverId,
      message,
    })

    return res
      .status(200)
      .json({ message: "Đã gửi yêu cầu kết bạn", friendRequest })
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu kết bạn", error)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params
    const userId = req.user._id // objectId của người dùng đang đăng nhập

    const friendRequest = await FriendRequest.findById(requestId)
    // console.log(requestId, userId, friendRequest)

    if (!friendRequest) {
      return res.status(404).json({ message: "Yêu cầu kết bạn không tồn tại" })
    }

    // chỉ người nhận mới có quyền chấp nhận
    if (friendRequest.receiverId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Không có quyền chấp nhận yêu cầu kết bạn này" })
    }

    const friend = await Friend.create({
      userId: friendRequest.senderId,
      friendId: friendRequest.receiverId,
    })
    // xoá yêu cầu kết bạn sau khi chấp nhận
    await FriendRequest.findByIdAndDelete(requestId)

    const newFriend = await User.findById(friendRequest.senderId)
      .select("_id displayName avatarUrl")
      .lean()

    return res.status(200).json({
      message: "Đã chấp nhận yêu cầu kết bạn",
      newFriend,
    })
  } catch (error) {
    console.error("Lỗi khi chấp nhận yêu cầu kết bạn", error)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params
    const userId = req.user._id

    const friendRequest = await FriendRequest.findById(requestId)
    if (!friendRequest) {
      return res.status(404).json({ message: "Yêu cầu kết bạn không tồn tại" })
    }

    // chỉ người nhận mới có quyền từ chối
    if (friendRequest.receiverId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Không có quyền từ chối yêu cầu kết bạn này" })
    }

    await FriendRequest.findByIdAndDelete(requestId)

    return res.status(204).end()
  } catch (error) {
    console.error("Lỗi khi từ chối yêu cầu kết bạn", error)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.user._id
    const friends = await Friend.find({
      $or: [{ userId }, { friendId: userId }],
    })
      .populate([
        { path: "userId", select: "_id displayName avatarUrl" },
        { path: "friendId", select: "_id displayName avatarUrl" },
      ])
      .lean()

    if (!friends.length) {
      return res.status(200).json({ friends: [] })
    }

    // chỉ lấy thông tin của bạn bè, không lấy thông tin của chính mình
    const friendDetails = friends.map((friend) =>
      friend.userId._id.toString() === userId.toString()
        ? friend.friendId
        : friend.userId
    )
    return res.status(200).json({ friends: friendDetails })
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bạn bè", error)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id

    const populateFields = "_id username displayName avatarUrl"

    const [sentRequests, receivedRequests] = await Promise.all([
      FriendRequest.find({ senderId: userId })
        .populate({ path: "receiverId", select: populateFields })
        .lean(),
      FriendRequest.find({ receiverId: userId })
        .populate({ path: "senderId", select: populateFields })
        .lean(),
    ])
    return res.status(200).json({ sentRequests, receivedRequests })
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu cầu kết bạn", error)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
}
