function get_tasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    let list_html = '';
    tasks.forEach(function (item, i) {
      list_html += `
        <li data-id="${item.item_id}">
          <div class="item_flex">
            <div class="left_block">
              <div class="btn_flex">
                <button type="button" class="btn_up">往上</button>
                <button type="button" class="btn_down">往下</button>
              </div>
            </div>
            <div class="middle_block">
              <div class="star_block">
                <span class="star${
                  item.star >= 1 ? ' -on' : ''
                }" data-star="1"><i class="fas fa-star"></i></span>
                <span class="star${
                  item.star >= 2 ? ' -on' : ''
                }" data-star="2"><i class="fas fa-star"></i></span>
                <span class="star${
                  item.star >= 3 ? ' -on' : ''
                }" data-star="3"><i class="fas fa-star"></i></span>
                <span class="star${
                  item.star >= 4 ? ' -on' : ''
                }" data-star="4"><i class="fas fa-star"></i></span>
                <span class="star${
                  item.star >= 5 ? ' -on' : ''
                }" data-star="5"><i class="fas fa-star"></i></span>
              </div>
              <p class="para">${item.name}</p>
              <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${
                item.name
              }">
            </div>
            <div class="right_block">
              <div class="btn_flex">
                <button type="button" class="btn_update">更新</button>
                <button type="button" class="btn_delete">移除</button>
              </div>
            </div>
          </div>
        </li>
      `;
    });
    let ul_task_list = document.getElementsByClassName('task_list')[0];
    ul_task_list.innerHTML = list_html;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  get_tasks(); // DOMContentLoaded 事件發生時，執行這裡的程式

  // ======輸入框點擊及取消效果======
  let task_name = document.getElementsByClassName('task_name')[0]; //取得class為task_name的標籤，不加索引值會是一個陣列，所以不管陣列裡是一個或多個值，都要指定索引值才能取得。
  task_name.addEventListener('focus', function () {
    this.closest('div.task_add_block').classList.add('-on');
  }); //task_name[0]觸發focus事件時，task_add_block加上-on這個class
  task_name.addEventListener('blur', function () {
    this.closest('div.task_add_block').classList.remove('-on');
  }); //task_name[0]觸發blur事件時，task_add_block移除-on這個class

  //
  //
  //
  // ======新增待辦事項======
  // 按下ENTER也能新增
  task_name.addEventListener('keyup', function (e) {
    //input輸入欄綁定keyup事件
    if (e.which == 13 || e.which == 108) {
      //enter鍵的which值為13，大鍵盤右側數字鍵的enter值為108，如果輸入enter則執行下面程式
      let enter = document.getElementsByClassName('task_add')[0]; //取得新增按鈕
      enter.click(); //模擬點擊"新增"按鈕事件，會執行下面針對"新增"按鈕觸發click事件的function
    }
  });

  // 點新增按鈕新增
  let btn_task_add = document.getElementsByClassName('task_add')[0]; //取得class為task_add的button標籤

  btn_task_add.addEventListener('click', function () {
    //綁定click事件
    let input_text = task_name.value.trim();
    //此函式為輸入的文字最左跟最右有空格都移除
    if (input_text != '') {
      let item_id = Date.now(); // timestamp 當做該項的 id
      //若輸入框不是空字串的時候執行下方程式
      let html_list =
        `
      <li data-id="${item_id}">
        <div class="item_flex">
          <div class="left_block">
            <div class="btn_flex">
              <button type="button" class="btn_up">往上</button>
              <button type="button" class="btn_down">往下</button>
            </div>
          </div>
          <div class="middle_block">
            <div class="star_block">
              <span class="star" data-star="1"><i class="fas fa-star"></i></span>
              <span class="star" data-star="2"><i class="fas fa-star"></i></span>
              <span class="star" data-star="3"><i class="fas fa-star"></i></span>
              <span class="star" data-star="4"><i class="fas fa-star"></i></span>
              <span class="star" data-star="5"><i class="fas fa-star"></i></span>
            </div>
            <p class="para">` +
        input_text +
        `</p>
            <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${input_text}">
          </div>
          <div class="right_block">
            <div class="btn_flex">
              <button type="button" class="btn_update">更新</button>
              <button type="button" class="btn_delete">移除</button>
            </div>
          </div>
        </div>
      </li>
    `;

      let ul_task_list = document.getElementsByClassName('task_list')[0]; //取得class為task_list的ul標籤
      ul_task_list.insertAdjacentHTML('afterbegin', html_list); // 在element裡面，第一個子元素之前加上html_list內容。
      task_name.value = '';

      //====== 新增資料至 localStorage======
      let task = {
        item_id: item_id,
        name: input_text, // 新增的待辦事項文字
        star: 0, // 預設 0
      };
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        // 若存在
        tasks.unshift(task);
      } else {
        // 若不存在
        tasks = [task];
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
});
//
//
//
// ======移除資料======
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn_delete')) {
    //在網頁點擊時，如果點擊到的是移除按鈕，執行以下判斷
    let check_delete = confirm('想移除是不是?'); //跳出確認視窗，要宣告變數放入，下面會用到此變數控制
    if (check_delete) {
      // 先從localStorage移除資料
      let del_item = e.target.closest('li').getAttribute('data-id');
      console.log(del_item);
      //取得點擊移除鈕當下最靠近該按鈕最近的li，元素data-id裡的內容
      let get_local_tasks = JSON.parse(localStorage.getItem('tasks'));
      console.log(get_local_tasks);
      //取得localStorage項目為tsaks的資料，因取出來的是字串型態，所以需用語法JSON.parse()轉成物件以便能做取物件內資料動作
      get_local_tasks.forEach(function (items, i) {
        if (del_item == items.item_id) {
          get_local_tasks.splice(get_local_tasks[i], 1);
        }
      }); //將從localStoreage拿出的tasks物件做迴圈逐一比對判斷，如果del_item拿到的data-id等於get_local_tasks的項目id，則使用陣列刪除.splice語法，刪除該項索引，個數一個
      localStorage.setItem('tasks', JSON.stringify(get_local_tasks)); //刪除完後但資料庫還沒更新，所以要.setItem到資料庫該物件名稱(key)tasks，要放入的資料(value)，並且要用JSON.stringify()將字串型態轉成物件型態
      e.target.closest('li').classList.add('fade_out'); //當將下點擊的移除鈕之最靠近的li加上fade_out的class(fade_out已寫在CSS)
      setTimeout(function () {
        e.target.closest('li').remove();
      }, 1000); //設置一秒後li刪除
    }
  }
});
//
//
//
// ======清空資料======
let clear_btn = document.getElementsByClassName('btn_empty')[0];
clear_btn.addEventListener('click', function () {
  let check_clear = confirm('想清除逆啦');
  if (check_clear) {
    // 先從localStorage清空資料
    localStorage.clear(); //清空資料庫

    let all_list = document.getElementsByClassName('task_list')[0]; //取得task_list這個ul標籤
    for (let i = 0; i < all_list.children.length; i++) {
      //.children為取得子元素，這裡取得all_list這個ul標籤裡面的子元素li的長度
      all_list.children[i].classList.add('fade_out'); //將所有子元素用迴圈加上fade_out
    }
    setTimeout(function () {
      all_list.innerHTML = '';
    }, 1000); //一秒後加入空字串清空畫面，.innerHTML為更新元素裡的全部內容，原內容會整個被清空。
  }
});
//
//
//
// ======更新待辦事項======
document.addEventListener('click', function (e) {
  console.log('ccc');
  if (e.target.classList.contains('btn_update')) {
    // console.log('cccccc');
    let update_list = e.target
      .closest('li')
      .querySelector('input.task_name_update')
      .value.trim();
    console.log(update_list);
    if (update_list == '') {
      alert('輸入啦幹');
    } else {
      e.target.closest('li').querySelector('p.para').innerHTML = update_list;
      if (
        e.target
          .closest('li')
          .querySelector('p.para')
          .classList.contains('-none')
      ) {
        e.target
          .closest('li')
          .querySelector('p.para')
          .classList.remove('-none');
      } else {
        e.target.closest('li').querySelector('p.para').classList.add('-none');
      }

      e.target
        .closest('li')
        .querySelector('input.task_name_update').value = update_list;
      if (
        e.target
          .closest('li')
          .querySelector('input.task_name_update')
          .classList.contains('-none')
      ) {
        e.target
          .closest('li')
          .querySelector('input.task_name_update')
          .classList.remove('-none');
      } else {
        e.target
          .closest('li')
          .querySelector('input.task_name_update')
          .classList.add('-none');
      }
    }
  }
});
