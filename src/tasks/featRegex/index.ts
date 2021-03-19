

var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
var check = 'THÔNG TIN SẢN PHẨM:: https://www.mudaru.com/vi/ https://www.mudaru.com/vi/profile.html Fanpage Facebook: http://fb.me/mudaru.vietnam�Kênh Youtube : https://www.youtube.com/watch?v=h9deNaF7aVE&list=PLZhYfjojChzYC8-sytXJ_pt61jdfP0nPR� Hồ sơ sản phẩm:https://bitly.com.vn/adZUF---------------ỉ: L27TP Cần Thơ �Website: www.tnbgroup.vn�Website: www.tnbvietnam.vn'
// const check = 'lạcCTY TNHH VIỆT EU115/13B Phạm Hữu Lầu,Hotline: *** (Mr. Thịnh) Website: www.sunigreenfarm.vn Link đặt hàng: m.me/sunigreenfarmvn  , Phường Phú Mỹ , Quận 7. TP HCMVPDD: 96-98 Cao Triều Phát , Phường Tân Phong , Quận 7. TP HCM0767_318_475( Ms Hana )0918_374_750( Mr Thanh )Hotline: 028_ 5410 7917Email : vieteufood@gmail.comRất mong hợp tác cùng anh chị'
export const filterUrl = () => {
    let emailSet = [];
    let emailMatches = check.match(expression);
    if (emailMatches) {
        emailMatches.forEach(email => {
            emailSet.push(email);
        })
    }
    console.log(emailSet);
}

 