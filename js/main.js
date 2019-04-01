(function ($) {
    $(function () {

        initMap();

        //Google map
        function initMap() {
            $.ajax({
                    url: "./js/map_marker.json",
                    dataType: "json"
                })
                .then(
                    // 通信成功時のコールバック
                    function (data) {
                        // デフォルトの設定
                        var center = {
                            lat: 35.6954806,
                            lng: 139.76325010000005
                        }; // デフォルト中心地

                        var map = new google.maps.Map(document.getElementById('gglMap'), { // マップを置く場所とデフォルトの設定
                            zoom: 15, // デフォルト倍率
                            center: center, // デフォルト中心地
                            scrollwheel: false // ホイールスクロールで動作しない
                        });

                        var markerData = data.marker; // map_marker.jsonのデータを取得

                        // マーカー毎の処理
                        var myLatLng = []; // 各マーカーの座標を収納
                        var imgUrl = []; // 各マーカーの画像urlを収納
                        var marker = []; // 各マーカーデータを収納
                        var markerWindowContent = []; // 各マーカーのウィンドウ内のコンテンツデータを収納
                        var markerWindow = []; // 各マーカーウィンドウデータを収納

                        for (var i = 0; i < markerData.length; i++) { // マーカーの数だけ処理を繰り返す
                            myLatLng[i] = new google.maps.LatLng(markerData[i]['lat'], markerData[i]['lng']); // 各マーカーの座標

                            // マーカー画像
                            imgUrl[i] = markerData[i]['jsonImgUrl']; // 各マーカーの画像url

                            // 各マーカーの設定
                            marker[i] = new google.maps.Marker({
                                position: myLatLng[i], // 各マーカーの座標
                                map: map, // 使用するマップ
                                icon: imgUrl[i] // 各マーカーの画像
                            });

                            // 情報ウィンドウ
                            markerWindowContent[i] = '<div>' + markerData[i]['text'] + '</div>'; // 各情報ウィンドウ内コンテンツ

                            markerWindow[i] = new google.maps.InfoWindow({ // 各情報ウィンドウデータ
                                content: markerWindowContent[i]
                            });

                            markerEvent(i); // マーカークリック時イベント
                        }

                        // マーカークリック時イベント
                        // クリックイベントはイベント追加時とクリック時で変数iの値が変わるためforの外に出す
                        function markerEvent(i) {
                            marker[i].addListener('click', function () { // 各マーカーをクリックした時のイベントを設定
                                $(markerWindow).each(function(i){ // markerWindow内の配列全てに適用
                                    markerWindow[i].close(); // 全ての情報ウィンドウを閉じる
                                })
                                markerWindow[i].open(map, marker[i]); // クリックしたマーカーの情報ウィンドウを開く
                            });
                        }

                    },
                    // 通信失敗時のコールバック
                    function () {
                        $('#gglMap').text('エラー');
                    }
                );
        }

    });
})(jQuery);