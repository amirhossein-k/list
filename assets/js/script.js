"use strick";

const printBtn = document.querySelector("#printBtn");
const addBtn = document.querySelector(".content .fixed .add");
var price = document.getElementById("price");
var title = document.getElementById("title");
var describe = document.getElementById("describe");
var body = document.querySelector(".container-fluid .list");
var my_modal = document.querySelector(".container-fluid .update_modal");
var trash = document.querySelectorAll(".list_first .icon_content .trash");

var ad = document.querySelector(".update_modal input[type='file'] ");
const priceTo = document.querySelector(".priceTo");

let elements = document.querySelectorAll(".list_first .icon_content .add");
var picc;
var target_data
const togle = () => {
  for (element of elements) {
    element.addEventListener("click", function () {
      let btn = this;
  
      const detail_list =
        btn.parentNode.parentNode.parentNode.parentNode.parentNode
          .childNodes[1];
     

      if (!detail_list.dataset.clicked) {
        detail_list.setAttribute("data-clicked", "true");
        detail_list.style.display = "flex";
      } else {
        detail_list.removeAttribute("data-clicked");
        detail_list.style.display = "none";
        detail_list.removeAttribute("style");
      }
    });
  }
};

var datas;
const getBreeds = async () => {
  try {
    return await axios.get("http://upload.iran.liara.run/api/list/");
  } catch (error) {
    console.error(error);
  }
};

getBreeds()
  .then((url) => {
    const res = url;
    return res;
  })
  .then((res) => {
    datas = res.data;
   
    //

    for (dataaa of datas) {
      var listFirst = document.getElementById("list_first");
      var listDetail = document.getElementById("detail_list");

      var clone_listFirst = listFirst.cloneNode(true);
      var clone_listDetail = listDetail.cloneNode(true);
     

      const toPersianNumber = price.value.num2persian();
     
      clone_listFirst.children[0].children[0].children[1].children[0].innerHTML =
        dataaa.title_value;
      clone_listFirst.children[0].children[0].children[1].children[0].innerHTML =
        dataaa.title_value;
      clone_listFirst.children[1].children[0].children[1].children[0].children[0].innerHTML =
        dataaa.price_value;
      clone_listFirst.children[1].children[0].children[1].children[0].children[1].innerHTML =
        dataaa.priceTo_value;
      clone_listFirst.children[2].children[0].children[2].children[0].setAttribute(
        "data_id",
        dataaa._id
      );
      clone_listFirst.children[2].children[0].children[2].children[0].setAttribute(
        "data_key",
        dataaa.picc.fileKey
      );

   


      clone_listDetail.children[0].children[0].children[0].children[0].children[1].children[0].innerHTML =
        dataaa.title_value;
      clone_listDetail.children[0].children[0].children[1].children[0].children[1].children[0].innerHTML =
        dataaa.price_value;
      clone_listDetail.children[0].children[0].children[1].children[0].children[1].children[1].innerHTML =
        dataaa.priceTo_value;
      clone_listDetail.children[0].children[0].children[2].children[0].children[1].children[0].innerHTML =
        dataaa.describe_value;
      clone_listDetail.children[0].children[0].children[3].children[0].children[0].children[0].src =
        dataaa.picc.file.filePath;

      const col_12 = document.createElement("div");
      col_12.classList.add("col-12");

      col_12.appendChild(clone_listFirst);
      col_12.appendChild(clone_listDetail);
      body.appendChild(col_12);
      elements = document.querySelectorAll(".list_first .icon_content .add");
      trash = document.querySelectorAll(".list_first .icon_content .trash");

    
    }

    togle();
   
  });

// uploade file///////////////////////////////////

const picList = async (file) => {
  var update_modal = document.querySelector(".container-fluid .update_modal");

  const formData = new FormData();
  formData.append("title", "pic");
  
  const config = {
    header: {
      "content-type": "multipart/form-data",
    },
  };
  
  try {
    if (update_modal.style.display === "block") {
      var add = document.querySelector(".container-fluid .update_modal .fixed .add");
      


      formData.append("file", this.ad.files[0]);
      const key  =target_data[0].picc.fileKey
     
      formData.append('key',key)
     const { data } = await axios.put(
       "http://upload.iran.liara.run/api/uploade/updatesingle",
       formData,
       config
     );


     picc = data;
    if(data)add.classList.remove('disabled')
     


    } else {
      var add_new = document.querySelector('.content .fixed .add ')
     
      formData.append("file", file.parentNode.children[1].files[0]);

      const { data } = await axios.post(
        "http://upload.iran.liara.run/api/uploade/single",
        formData,
        config
      );

  
      picc = data;
      if(data)add_new.classList.remove('disabled')
      
    }
  } catch (error) {
    console.log(error);
  }
};

// /////////////////////////////////////


// for change to price farsi/////////////////
price.addEventListener("change", (e) => {
  const value_price = e.target.value;

  const toPersianNumber = value_price.num2persian();
  priceTo.innerHTML = toPersianNumber;
  console.log(priceTo, "price");
});

///////////////////////////////////////////////






const showModal = (titleLodaing) => {
  const loading = document.querySelector(".my_modal .loading");
  const my_modal = document.querySelector(".my_modal");
  const my_title = document.querySelector(".my_modal .my_title");
  my_title.innerHTML = titleLodaing;
  my_modal.style.display = "block";
  loading.classList.add("active");
};

var suucess = "";

// let array = []
const create = async (e) => {
 

  var update_modal = document.querySelector(".container-fluid .update_modal");

  if (update_modal.style.display === "block") {

    var id = target_data[0]._id
    const  pic_id = picc._id


    
    var price_value = document.getElementById("price_update").value;
    var title_value = document.getElementById("title_update").value;
    var describe_value = document.getElementById("describe_update").value;
    var priceTo_value = document.querySelector(".update_modal .content .fixed .priceTo").innerHTML;

  
      const { data } = await axios.put("http://upload.iran.liara.run/api/list/update", {
      title_value,
      
      price_value,
      priceTo_value,
      describe_value,
      picc,
      id,pic_id
      });
    if (data) {
      showModal(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

  
  }else{

 
    var title_value = title.value;
    const price_value = price.value;
    const priceTo_value = priceTo.innerHTML;
    const describe_value = describe.value;
    const pic_id = picc._id
    
    const { data } = await axios.post("http://upload.iran.liara.run/api/list/create", {
      title_value,
      title_value,
      price_value,
      priceTo_value,
      describe_value,
      picc,pic_id
    });
    if (data) {
      showModal(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }

};



const deletee = async (e) => {
  const id = e.getAttribute("data_id");
  const target = datas.filter((item) => item._id === id)
  const file = target[0].picc
 
  const config = {
    header: {
      "content-type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("file", file);
  const key  =target[0].picc.fileKey

  const pic_id  =target[0].pic_id

  const { data } = await axios.delete(
    `http://upload.iran.liara.run/api/list/delete/${id}/${key}/${pic_id}`,formData,config
  );

  if (data) {
    showModal(data.message);
    setTimeout(() => {
      window.location.reload();
    }, 2300);
  }
};

const openUpdate = async (e) => {
  var update_modal = document.querySelector(".container-fluid .update_modal");
  if (update_modal.style.display === "block") {
    update_modal.style.display = "none";
    update_modal.replaceChildren("");
  } else {

    var div_close = document.createElement('div')
    div_close.classList.add('close')
    div_close.innerHTML ='<i class="bi bi-x-lg"></i>'
    div_close.onclick= ()=>{update_modal.style.display ="none" ;update_modal.replaceChildren("");}
    update_modal.appendChild(div_close)
 
    var content = document.getElementById("content");

    update_modal.style.display = "block";
    var clone_content = content.cloneNode(true);
    const id =
      e.parentNode.parentNode.children[2].children[0].getAttribute("data_id");
 

     target_data = datas.filter((item) => item._id === id);
    const pic_moadal =
      clone_content.children[0].children[0].children[4].children[0].children[1]
        .children[0].src;
    

   

    clone_content.children[0].children[0].children[0].children[0].children[1].children[0].value =
      target_data[0].title_value;
    clone_content.children[0].children[0].children[0].children[0].children[1].children[0].id ='title_update'

    clone_content.children[0].children[0].children[1].children[0].children[1].children[0].value =
      target_data[0].price_value;
    clone_content.children[0].children[0].children[1].children[0].children[1].children[0].id = 'price_update'

    clone_content.children[0].children[0].children[1].children[0].children[2].innerHTML =
      target_data[0].priceTo_value;

    
    clone_content.children[0].children[0].children[2].children[0].children[1].children[0].value =
      target_data[0].describe_value;
    clone_content.children[0].children[0].children[2].children[0].children[1].children[0].id='describe_update'

    clone_content.children[0].children[0].children[4].children[0].children[0].children[0].removeAttribute(
      "for"
    );
    clone_content.children[0].children[0].children[4].children[0].children[0].children[0].setAttribute(
      "for",
      "pic_modal"
    );

    clone_content.children[0].children[0].children[4].children[0].children[0].children[1].id =
      "pic_modal";
    clone_content.children[0].children[0].children[4].children[0].children[0].children[1].classList.remove(
      "pic"
    );
    clone_content.children[0].children[0].children[4].children[0].children[0].children[1].classList.add(
      "pic_moadal"
    );
    clone_content.children[0].children[0].children[4].children[0].children[0].children[1].name =
      "pic_moadal";

    clone_content.children[0].children[0].children[4].children[0].children[1].children[0].id =
      "pic_moadal";
    clone_content.children[0].children[0].children[4].children[0].children[1]
      .children[0].files;
    clone_content.children[0].children[0].children[4].children[0].children[0].children[1].setAttribute(
      "oninput",
      function a(pic_moadal) {
        pic_moadal.src = window.URL.createObjectURL(this.files[0]);
      }
    );
    clone_content.children[0].children[0].children[4].children[0].children[1].children[0].src =
      target_data[0].picc.file.filePath;

    my_modal.appendChild(clone_content);


    const price = document.getElementById("price_update");
    const priceTo = document.querySelector(".update_modal .content .fixed .priceTo ");

    price.addEventListener("change", (e) => {
      const value_price = e.target.value;
    
      const toPersianNumber = value_price.num2persian();
      priceTo.innerHTML = toPersianNumber;
   
    });


    ad = document.querySelector(".update_modal input[type='file'] ");
    var w = document.getElementById("pic_moadal");
    ad.addEventListener("change", (e) => {
     
      if (e.target.files.length > 0) {
      
        w.src = window.URL.createObjectURL(e.target.files[0]);
      }
    });
  }
};
