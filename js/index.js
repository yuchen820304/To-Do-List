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

//======更新localStorage中的排序======
function items_sort(item_id, direction) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (direction == 'up') {
    //往上
    let current_li_index; //宣告點擊當下的該項索引
    let current_li_data; //宣告點擊當下的該項資料內容
    let before_li_data; //宣告前一項資料內容

    tasks.forEach(function (task, i) {
      //做迴圈比對
      if (item_id == task.item_id) {
        //如果item_id等於該項的item_id
        current_li_index = i; //取得點擊的li索引
        current_li_data = task; //取得點擊的li資料
        before_li_data = tasks[i - 1]; //取得點擊的li的前一項資料
      }
    });
    tasks[current_li_index - 1] = current_li_data; //點擊後前一項資料變成當前資料
    tasks[current_li_index] = before_li_data; //當前資料變成前一向資料，達成往上目的
  }

  if (direction == 'down') {
    //往下
    let current_li_index; //宣告點擊當下的該項索引
    let current_li_data; //宣告點擊當下的該項資料內容
    let after_li_data; //宣告後一項資料內容

    tasks.forEach(function (task, i) {
      //做迴圈比對
      if (item_id == task.item_id) {
        //如果item_id等於該項的item_id
        current_li_index = i; //取得點擊的li索引
        current_li_data = task; //取得點擊的li資料
        after_li_data = tasks[i + 1]; //取得點擊的li的下一項資料
      }
    });
    tasks[current_li_index] = after_li_data; //當前資料變成後一向資料，達成往下目的
    tasks[current_li_index + 1] = current_li_data; //點擊後下一項資料變成當前資料
  }
  localStorage.setItem('tasks', JSON.stringify(tasks)); //更新後推上資料庫
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
    let check_delete = confirm('是否移除?'); //跳出確認視窗，要宣告變數放入，下面會用到此變數控制
    if (check_delete) {
      // 先從localStorage移除資料
      let del_item = e.target.closest('li').getAttribute('data-id');
      //取得點擊移除鈕當下最靠近該按鈕最近的li，元素data-id裡的內容
      let get_local_tasks = JSON.parse(localStorage.getItem('tasks'));
      let updated_tasks = [];
      //取得localStorage項目為tsaks的資料，因取出來的是字串型態，所以需用語法JSON.parse()轉成物件以便能做取物件內資料動作
      get_local_tasks.forEach(function (items, i) {
        if (del_item != items.item_id) {
          updated_tasks.push(items);
        }
      }); //將從localStoreage拿出的tasks物件做迴圈逐一比對判斷，如果del_item拿到的data-id等於get_local_tasks的項目id，則使用陣列刪除.splice語法，刪除該項索引，個數一個
      localStorage.setItem('tasks', JSON.stringify(updated_tasks)); //刪除完後但資料庫還沒更新，所以要.setItem到資料庫該物件名稱(key)tasks，要放入的資料(value)，並且要用JSON.stringify()將字串型態轉成物件型態
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
  let check_clear = confirm('是否清空?');
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
  //對瀏覽器綁定click事件，因無資料時沒有更新按鈕可以按，所以用事件冒泡特性執行
  if (e.target.classList.contains('btn_update')) {
    //如果點擊到更新按鈕執行以下程式

    let update_list = e.target
      .closest('li')
      .querySelector('input.task_name_update')
      .value.trim(); //更新欄位輸入的值給update_list
    console.log(update_list);
    if (update_list == '') {
      ///如果欄位是空字串，提醒要輸入
      alert('請輸入更新內容!');
    } else {
      e.target.closest('li').querySelector('p.para').innerHTML = update_list; //不是空字串的話，找到該點擊項目最近的li標籤，再找到裡面的class為para的p段落，更新到頁面上的值等於update_list
      if (
        //如果點擊後，p段落class有-none的話移除，沒有的話就加入-none，此用意在於點擊更新後可以將顯示原資料改成顯示更新輸入欄位
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
        .querySelector('input.task_name_update').value = update_list; //更新欄位輸入的值等於update_list
      if (
        //如果點擊後，更新的輸入欄有-none的class標籤則移除，沒有則加入
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

      // ======更新localStorage中，name的資料======
      let update_item = e.target.closest('li').getAttribute('data-id'); //點擊後取得最近li的元素data-id
      let get_local_tasks = JSON.parse(localStorage.getItem('tasks')); //將資料庫資料取出來並轉成物件型態以便做迴圈比對操作
      get_local_tasks.forEach(function (items, i) {
        if (update_item == items.item_id) {
          //如果data-id等於取出的資料的item_id，那就將update_list的值給get_local_tasks該項的name
          get_local_tasks[i].name = update_list;
        }
      });
      localStorage.setItem('tasks', JSON.stringify(get_local_tasks)); //資料庫更新資料
    }
  }
});
//
//
//
// ======排序======
document.addEventListener('click', function (e) {
  // 往上
  if (
    e.target.classList.contains('btn_up') &&
    e.target.closest('li').previousElementSibling
  ) {
    //如果點擊當下點到往上按鈕，且前面是有元素的情況下執行下面程式
    let li_el = e.target.closest('li');
    //取得點擊當下最近的li
    let item_id = li_el.getAttribute('data-id');
    //取得這個li的data-id
    let clone_html = li_el.outerHTML;
    //將這個li的內容複製成字串
    li_el.previousElementSibling.insertAdjacentHTML('beforebegin', clone_html); //在li的前一個元素之前，加入上面複製下來的內容
    li_el.remove(); //再把原本的li刪除達成往上目的
    // ======更新localStorage的排序======
    items_sort(item_id, 'up'); //呼叫itmes_sort這支function
  }

  // 往下
  if (
    e.target.classList.contains('btn_down') &&
    e.target.closest('li').nextElementSibling
  ) {
    //如果點擊當下點到往下按鈕，且後面是有元素的情況下執行下面程式
    let li_el = e.target.closest('li');
    //取得點擊當下最近的li
    let item_id = li_el.getAttribute('data-id');
    //取得這個li的data-id
    let clone_html = li_el.outerHTML;
    //將這個li的內容複製成字串
    li_el.nextElementSibling.insertAdjacentHTML('afterend', clone_html); //在li的前一個元素之前，加入上面複製下來的內容
    li_el.remove(); //再把原本的li刪除達成往上目的
    // ======更新localStorage的排序======
    items_sort(item_id, 'down'); //呼叫itmes_sort這支function
  }
});
//
//
//
// ==== 星號的重要性 ===== //
document.addEventListener('click', function (e) {
  if (e.target.closest('span')) {
    //如果點擊到星星
    let span_el = e.target.closest('span'); //最近的span
    if (span_el.classList.contains('star')) {
      //如果最近的span有star這個class
      let current_star = parseInt(span_el.getAttribute('data-star')); //將當下點擊到的span的data-star(星號編號)轉成數字
      let star_span = span_el
        .closest('div.star_block')
        .querySelectorAll('span.star'); //取得有star這個class的所有span
      star_span.forEach(function (star_item, i) {
        //做迴圈判斷
        if (parseInt(star_item.getAttribute('data-star')) <= current_star) {
          //迴圈執行中，如果data-star數字小於等於點擊到的星星數字，就都加上-on，反之移除
          star_span[i].classList.add('-on');
        } else {
          star_span[i].classList.remove('-on');
        }
      });
      // ======更新localStorage中的star資料 ======//
      let item_id = span_el.closest('li').getAttribute('data-id'); //取得點擊星星當下最近的li的data-id
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      //取得資料庫資料並轉成物件進行迴圈判斷
      tasks.forEach(function (task, i) {
        if (item_id == task.item_id) {
          //如果item_id等於task的item_id
          tasks[i].star = current_star; //迴圈當下的這個tasks星星值為當下點擊到的星星數字
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks)); //資料更新後回推到資料庫
    }
  }
});
