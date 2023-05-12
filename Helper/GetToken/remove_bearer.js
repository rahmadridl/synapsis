import User from "../../Model/m_user.js";

export default async function getToken(datas) {
  var header_token = datas;

  if (header_token !== undefined) {
    // console.log("kondisi 1");
    var tokenRemoveBearer = header_token.split("Bearer ")[1];
    var base64Url = tokenRemoveBearer.split(".")[1];
    // console.log("token_data 2" + base64Url);
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // console.log("token_data 3" + base64);
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    var data_payload = JSON.parse(jsonPayload);
    var CekUserName = await User.findOne({
      where: {
        id: data_payload.id,
        token: tokenRemoveBearer,
      },
    });
    return await CekUserName;
    // const printAddress = async () => {
    //   const a = await CekUserName;
    //   // return a;
    //   console.log(a.id);
    // };
    // return printAddress();
  } else {
    var cookies = datas;
    var split_data = cookies.split(";");
    // console.log(split_data);
    var data = split_data.find((a) => a.startsWith(" Authorization="));
    console.log(data);
    var auth = data.split("=")[1];
    // console.log('cookies 3' + auth );
    var tokenRemoveBearer = auth.split("Bearer ")[1];
    // console.log('cookies 4' + tokenRemoveBearer );
    var base64Url = tokenRemoveBearer.split(".")[1];
    // console.log('token_data 2'+ base64Url );
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // console.log('token_data 3'+ base64);
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    var data_payload = JSON.parse(jsonPayload);
    var CekUserName = await User.findOne({
      where: {
        id: data_payload.id,
        token: tokenRemoveBearer,
      },
    });
    // const printAddress = async () => {
    //   const a = await CekUserName;
    //   // return a;

    //   console.log(a.id);
    // };
    // return printAddress();

    return await CekUserName;
  }
}
