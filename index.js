/** TEST A-B */
if( typeof sendData === "undefined"){

    class sendData{  

        constructor(){
            
            /** Atributes Change */
            this.testType           = "N/A";  // ✔️
            this.viewer             = 0;     
            this.interaction3D      = 0;
            this.interactionAR      = 0;
            this.addToCar           = null;  // ✔️
            this.timeInSesion       = null;  // ✔️
    
            /** Get only time */
            this.idCompany          = 413;
            this.sku                = null;  // ✔️
            this.category           = null;  // ✔️
            this.subCategory        = null;  // ✔️
            this.pathURL            = null;  // ✔️
            this.domain             = null;
            this.date               = null;  // ✔️
            this.infodevice         = null;  // ✔️
            
        };
    
        /** Consult last type test ✔️ */
        async consultTest(){
    
            /** verify userMark */
            if(localStorage.getItem('UserMudiTest')) {
                this.testType = localStorage.getItem('UserMudiTest');
                return
            };
    
            /** when the new user in, mark him */
            let body = {"idCompany": this.idCompany};
    
            const 
            consult  =  await fetch('https://viewer.mudi.com.co:3589/api/mudiv1/getInfoTest',{
                method:'Post',
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(body)
            })
    
            /** Update lastTest */
            const 
            response = await consult.json();
            await this.updateTest(response.data[0].test)
        };
    
        /** Update testActual  ✔️ --> Se puede revisar máaaaaaas a profundidad */
        async updateTest(lastTest){
    
            /** Modify testType DataBase */
            let testUpdate;
            lastTest == 'A' ? testUpdate = 'B' : testUpdate = 'A';
    
            /** Body */
            let body = {"idCompany":"147" , "typeTest":`${testUpdate}`};
    
            /** Request */
            const 
            consult  =  await fetch('https://viewer.mudi.com.co:3589/api/mudiv1/updateInfoTest',{
                method:'Post',
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(body)
            });
    
            // markUser here in localStorage
            this.testType=testUpdate;
            localStorage.setItem('UserMudiTest',testUpdate)
        };
    
        /** Recognize 
                HELP TO RECOGNIZE TYPE OF DEVICE  & INFO DEVICE 
                Android device: manufacturer & Model
                IOS : "Apple" & IOS version ✔️
        */
        recognizeDevice(){
    
            /** Define Structure Response */
            let response = {
                Device: null ,
                type: `Mobile`
            };
            
            const 
            userAgent   = navigator.userAgent,
            listUA      = userAgent.split(" ");
    
            /** Better use REGEX ❌ Add TO DO */
    
            /** OS Android  */
                if(userAgent.toLowerCase().includes('android')){
                    let androidVersion  = listUA[2] + ' ' + listUA[3];
                    let androidModel    = listUA[4] + ' ' + listUA[5];
                    response.Device = `Android ${androidModel} V-${androidVersion}`;
                }
    
            /** IOS */
                else if (userAgent.toLowerCase().includes('iphone'))    
                    response.Device = `iPhone OS ${listUA[5].split('_').join('.')}`;
                else if (userAgent.toLowerCase().includes('ipad'))      
                    response.Device = `iPad OS ${listUA[5].split('_').join('.')}`;
                else if (userAgent.toLowerCase().includes('Macintosh')) 
                    response.Device = `Macintosh OS ${listUA[6].split('_').join('.')}`;
                
            /** Window */
                else if (listUA[1].toLowerCase().includes('windows')){   
                    response.Device = `Windows V- ${listUA[3].replace(";", " ")} ${listUA[4].replace(";", " ")}`;
                    response.type = `Desk`
                }
    
            /** Linux */
                else if (userAgent.toLowerCase().includes('linux') && !userAgent.toLowerCase().includes('android')){
                    response.Device = `Linux`; 
                    response.type   = `Desk`;
                }
    
            /** Unknowled */
                else {
                    response.Device = "Desconocido"
                    response.type   = null;
                };
    
            this.infodevice = response;
        };
    
        /** Get Date ✔️ FORMAT DATETIME AAAA-MM-DD HH:MM:SS  */
        getDate(){
    
            /** Build Date */
            const dateActual = new Date();
    
            /** Build information */
            let dateInfo = {
                month           : dateActual.getMonth() + 1,
                day             : dateActual.getDate(),
                year            : dateActual.getFullYear(),
                hour            : dateActual.getHours(),
                minute          : dateActual.getMinutes(),
                seconds         : dateActual.getSeconds()  
            };
    
            /** Build Date Sesion  dd -- mm -- aa -- ||  hh -- mm -- ss */
            this.date = `${dateInfo.year}-${dateInfo.month<10 ? '0'+ dateInfo.month : dateInfo.month}-${dateInfo.day} ${dateInfo.hour<10 ? '0'+dateInfo.hour : dateInfo.hour}:${dateInfo.minute}:${dateInfo.seconds}`;
        };
    
        /** GET PATH URL AND Domain ✔️ */
        getPathURL(){
            this.pathURL = window.location.pathname;
            this.domain  = location.hostname.split('.')[1]
        };
    
        /** Event viewer */
        eventView(){
            this.viewer == 0 && (this.viewer++)
        };
    
        /** Event Mudi interaction 3D AR  */
        eventsMudi3D(){this.interaction3D ++};
        eventsMudiAR(){this.interactionAR ++};
    
        /** Event add to car */
        eventAddToCar(){
            /** Verifying btn Add to Car */
            let btnAddToCar =  document.body.querySelector('.cart-add')
            if(!btnAddToCar){ requestAnimationFrame(this.eventAddToCar.bind(this)) }
            else{ btnAddToCar.addEventListener('click',()=> this.addToCar++ ) }
        };
    
        /** Timing in Sesion  ✔️*/
        timeSesion(){
    
            /** Configaration Time */
            let time = {
                hour: 0,
                minutes: 0,
                seconds: 0
            };
        
            setInterval(() => {
        
                /**up one Sec */
                time.seconds++;
        
                /** verify Secs */
                if (time.seconds < 10) {
                    time.seconds = `0${time.seconds}`
                    time.minutes == 0 && (time.minutes = '00')
                    time.hour == 0 && (time.hour = '00')
                }
        
                /** VerifyMinutes */
                if (time.seconds == 60) {
                    time.seconds = '00';
                    time.minutes++;
                    time.minutes < 10 ? time.minutes = `0${time.minutes}` : time.minutes = `${time.minutes}`;
                }
        
                /** Verify hours */
                if (time.minutes == 60) {
                    time.minutes = '00';
                    time.hour++;
                    time.hour < 10 ? time.hour = `0${time.hour}` : time.hour = `${time.hour}`;
                }
        
                this.timeInSesion = `${time.hour}:${time.minutes}:${time.seconds}`;
        
            }, 1000);
        };
    
        /** Get sku  */
        getSkuNumer(sku){this.sku = sku};
    
        /** Get Category -- Programar por clientee */
        getCategory(category){ this.category = category};
    
        /** Get subCategory -- programar por cliente */
        getSubCategory(subCategory){this.subCategory = subCategory};
    
        /** Pixel Mudi ON */
        async pixelOn(skunumber){
    
            let beforeUnloaded =  window.addEventListener('beforeunload', (e)=>{
                
               this.sendDataMudiServer();
           } , false);
            
            /** verify Result typeTest */
            this.testType && (
    
                /** ✔️ get PathName */
                this.getPathURL(),
    
                this.getSkuNumer(skunumber),
    
                /** Event add To car */
                this.eventAddToCar(),
    
                /** ✔️ getDate */
                this.getDate(),
    
                /** ✔️get Device */
                this.recognizeDevice(),
    
                /** ✔️Listener sendData Mudi */
                beforeUnloaded
    
            );
        };
    
        /** sendData MudiSever */
        async sendDataMudiServer(){
            
            /** Build Body */
            let body = {
                "testType"          : this.testType,
                "viewer"            : this.viewer,
                "interaction3D"     : this.interaction3D,
                "interactionAR"     : this.interactionAR,
                "addToCar"          : this.addToCar,
                "idCompany"         : this.idCompany,
                "timeInSesion"      : this.timeInSesion,
                "sku"               : this.sku,
                "category"          : this.category,
                "subCategory"       : this.subCategory,
                "pathURL"           : this.pathURL,
                "dates"             : this.date,
                "device"            : this.infodevice.type,
                "deviceDescription" : this.infodevice.Device,
                "domain"            : this.domain
            };
            
            console.log(body)
            ;
    
            /** Doing request */
            try {
                const request = await fetch('https://viewer.mudi.com.co:3589/api/mudiv1/sendRegistry',{
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify(body)
                })
                const response = await request.json();
            } catch (error) {
                console.log(`Mudi Error:` + error)
            };
        };
    
    };
    const mudiData = new sendData();
    /** ✔️ start timer Mudi */
    mudiData.timeSesion();
}else console.log('dobleRenderMudi')

if( typeof MudiExperience === "undefined" ){
    /** Mudi Experience */
class MudiExperience{

    constructor(){
        this.color              = "#03457c";
        this.dataSever          = null;
        this.skuNumber          = null;
        this.fatherContainer    = null;
        this.category           = null;
        this.subCategory        = null;

        this.flagTesting        = true;
        this.timeVerify         = 0;
    };

    /** Conect mudiServer  ✔️ */
    async conectServer(skuNumber){
        
        const myBody = {"skus":[skuNumber]};
        this.skuNumber = skuNumber;
    
        try {
    
            /** We make the request to the MUDI server */
            const 
            request = await fetch('https://mudiview.mudi.com.co:7443/product/getProductsUrl',{
                method:'POST',
                headers:{   "Content-type":"application/json",
                            "tokenapi":"9vzPDkra7dXcH85mn8Xc"
                },
                body: JSON.stringify(myBody)
            })
            const 
            response = await request.json();
            this.dataServer = response.data[0];
    
        } catch (error) {console.error(`Mudi Error:\n${error}`)}

    };

    /** Create Styles ✔️ */
    createStyles(){

        /** Verify element HTML */
        if(document.head.querySelector('#stylesMudiGeneral')){return}

        const 
        link = document.createElement('LINK');
        link.setAttribute('rel','stylesheet');
        link.id="stylesMudiGeneral";
        link.href=`https://cdn.jsdelivr.net/gh/RodriguezJose92/bodesa@latest/index.css`; /* custom this path */
       
        document.head.appendChild(link)
    };

    /** Create button only 3D  ✔️*/
    createBtns(){

        /** Verify btns */
        document.body.querySelector('.btnsMudiContainer') && document.body.querySelector('.btnsMudiContainer').remove();

        /** Create Fragment */
        const fragment = document.createDocumentFragment();

        /** Create containers */
        const 
        containerBtns = document.createElement('DIV');
        containerBtns.classList.add('btnsMudiContainer');
        containerBtns.appendChild(this.createTooltip());
        containerBtns.innerHTML +=`
        <?xml version="1.0" encoding="UTF-8"?>
            <svg id="img3DBtn" class="btnMudi3D" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
                <defs>
                    <style>
                        .cls-1{
                            fill:${this.color} !important;
                            opacity:.6;
                        }
                        
                        .cls-1,.cls-2,.cls-3{
                            stroke-width:0px;
                        }
                        .cls-2{
                            fill:#f4f4f4;
                        }
                        .cls-3{
                            fill:${this.color} !important;
                        }
                    </style>
                </defs>
                <circle class="cls-2" cx="170" cy="178.45" r="150.5"/>
                <g id="vert3b-thumb">
                    <path id="Shape" class="cls-1" d="m270.61,176.12c0-20.59-22.41-38-55.68-46.34-8.14-34.05-25.18-56.97-45.29-56.97s-37.14,22.96-45.3,57.04c-4.71,1.2-9.26,2.58-13.59,4.16-1.88.69-2.86,2.8-2.18,4.72.67,1.92,2.74,2.92,4.62,2.24,3.04-1.11,6.21-2.08,9.45-2.98-.41,2.27-.77,4.53-1.11,6.84h.19c-3.33,22.19-3.12,44.79.61,66.91h-.09c.15.81.28,1.65.43,2.49v.04c-27.7-7.79-46.71-22.1-46.72-38.07,0-8.41,5.43-16.79,15.41-24.01l-1.15,6.06h0c-.19.97,0,1.97.54,2.79.54.82,1.37,1.38,2.32,1.57h0c.23.05.46.07.69.07,1.72-.02,3.2-1.26,3.54-2.99l2.9-15.36h0c.18-.96-.01-1.95-.55-2.76-.53-.81-1.36-1.37-2.3-1.55h0l-15.07-3.11c-1.94-.41-3.85.84-4.3,2.82-.1.48-.1.98,0,1.46.26,1.46,1.35,2.63,2.77,2.95h.17l7.05,1.4c-12.44,8.79-19.31,19.49-19.31,30.6h0c0,20.59,22.41,38,55.68,46.35,8.16,34.04,25.18,56.96,45.29,56.96,11.18,0,21.93-7.46,30.61-20.88l.9,7.36c.24,2.02,2.04,3.46,4.01,3.22,1.98-.25,3.38-2.08,3.14-4.11h0l-1.82-15.54c-.11-.97-.6-1.86-1.35-2.46-.75-.61-1.71-.88-2.66-.76h0l-15.19,1.87c-1.97.25-3.38,2.09-3.14,4.1h0c.24,2.02,2.03,3.46,4.01,3.22l5.99-.74c-7.26,11.15-15.84,17.31-24.45,17.31-15.61,0-29.58-19.46-37.21-47.77,12.27,2.37,24.73,3.55,37.21,3.51,12.51.04,24.99-1.15,37.28-3.53-.89,3.31-1.82,6.56-2.91,9.66-.16.47-.23.96-.19,1.45.09,1.76,1.38,3.2,3.08,3.45s3.34-.77,3.91-2.43h0c1.54-4.43,2.89-9.09,4.07-13.91,33.31-8.35,55.75-25.76,55.75-46.35h0l-.03.03Zm-53.98,38.09c2.35-12.55,3.52-25.3,3.49-38.08h0c.04-12.77-1.11-25.51-3.43-38.06,27.69,7.8,46.7,22.1,46.71,38.07,0,15.97-19.05,30.27-46.76,38.07h0Zm-84.21-86.17c7.61-28.35,21.6-47.83,37.22-47.83s29.58,19.45,37.21,47.78c-1.12-.22-2.22-.41-3.34-.62v.14c-11.19-2.01-22.53-3.03-33.89-3.03-10.91.03-21.79,1-32.54,2.89l.07-.2c-1.57.28-3.15.57-4.73.88Zm76.36,8.03c2.77,13.16,4.15,26.6,4.12,40.06.04,13.45-1.31,26.88-4.05,40.04-12.89,2.84-26.04,4.26-39.22,4.22-13.16.04-26.29-1.38-39.15-4.21v-.15c-5.48-26.38-5.48-53.65,0-80.04,25.82-5.54,52.49-5.52,78.3.07h0Z"/>
                    <path id="Path" class="cls-3" d="m122.61,187.91c4.2,4.12,9.83,6.44,15.7,6.49,6.91,0,10.75-2.98,10.75-7.34,0-4.61-3.51-6.75-11.43-6.75-2.39,0-6.24,0-7.09.09v-10.59c1.02.08,4.86.08,7.09.08,6.31,0,10.5-2.05,10.5-6.31,0-4.52-4.61-6.83-10.58-6.83-5.43,0-10.65,2.14-14.51,5.97l-5.98-7.51c5.57-6.07,13.53-9.38,21.76-9.06,13.31,0,21.51,5.97,21.51,15.44-.45,6.78-5.7,12.26-12.46,12.98,7.27.48,13.01,6.37,13.31,13.65,0,9.81-8.79,16.73-22.44,16.73-8.47.46-16.7-2.88-22.45-9.12l6.32-7.94Z"/>
                    <path id="Shape-2" class="cls-3" d="m170.32,147.04h22.45c17.83,0,30.21,11.35,30.21,28.51s-12.38,28.42-30.21,28.42h-22.45v-56.93Zm22.45,46.26c4.78.23,9.44-1.56,12.84-4.94,3.39-3.38,5.21-8.03,4.99-12.81.36-4.83-1.41-9.58-4.83-13-3.42-3.43-8.17-5.19-13-4.84h-10.33v35.59h10.33Z"/>
                </g>
            </svg>
        `;

        containerBtns.querySelector('#img3DBtn').addEventListener('click',()=>{
            this.createModal();
            /** Pixel Mudi */
            mudiData.eventsMudi3D();
            /** GTM */
            this.sendEventInteraction('3D');
        });

        fragment.appendChild(containerBtns)

        /** Add DOM */
        this.fatherContainer.appendChild(fragment)
    };

    /** Create Modal ✔️ */
    createModal(){

        /** create variables */
        let flagAR = false;

        /** We create a shell for the MUDI modal */
        const 
        modalMudi = document.createElement('DIV');
        modalMudi.id=`modalMudi`;
        modalMudi.classList.add(`mudiModal`);
        modalMudi.innerHTML=`
            <div class="iframeMudi3D">
                <button class="closeModalMudi" style="color:${this.color}">X</button>
                <iframe class="modelMudi" src="${this.dataServer.URL_WEB}"></iframe>
                <div class="containerBtnsActions">
                    <svg xmlns="http://www.w3.org/2000/svg" id="imgARBtn" class="imgBtnAR" viewBox="0 0 317 112">
                    <defs>
                        <style>
                        .cls-1_modal{fill:${this.color};stroke:${this.color};stroke-miterlimit:10;stroke-width:3px;}
                        .cls-2_modal{font-family:FrutigerBold, Frutiger;fill:white}
                        .cls-2_modal tspan{ font-size:17px}
                        .cls-3_modal{stroke-width:0px;fill:white;}
                        </style>
                    </defs>
                    
                    <rect class="cls-1_modal" x="9.52" y="9" width="292.07" height="87" rx="40" ry="40"/>
                        <path class="cls-3_modal" d="m42.64,46.07c.66,0,1.19-.53,1.19-1.19v-8.1c0-.66-.53-1.19-1.19-1.19s-1.19.53-1.19,1.19v8.04c0,.66.53,1.19,1.19,1.19"/>
                        <path class="cls-3_modal" d="m59.58,28.25c.21,0,.42-.06.6-.16l6.4-3.67,6.4,3.68c.57.33,1.31.13,1.64-.44.33-.57.13-1.31-.44-1.64h0l-7.13-4.01c-.37-.21-.83-.21-1.19,0l-6.94,4.02c-.57.34-.75,1.07-.41,1.64.23.38.64.6,1.08.58"/>
                        <path class="cls-3_modal" d="m66.5,59.88c.66,0,1.19-.53,1.19-1.19v-8.03c0-.66-.54-1.2-1.2-1.2s-1.2.54-1.2,1.2v8.04c0,.66.53,1.19,1.19,1.19"/>
                        <path class="cls-3_modal" d="m90.39,46.07c.66,0,1.19-.53,1.19-1.19,0,0,0,0,0-.01v-8.09c0-.66-.53-1.19-1.19-1.19s-1.19.53-1.19,1.19v8.04c0,.66.53,1.19,1.19,1.19"/>
                        <path class="cls-3_modal" d="m42.64,65.58c.66,0,1.19-.53,1.19-1.19v-7.99c0-.66-.53-1.19-1.19-1.19s-1.19.53-1.19,1.19v8.04c.03.64.56,1.14,1.19,1.14Z"/>
                        <path class="cls-3_modal" d="m90.39,65.58c.64,0,1.17-.5,1.19-1.14v-8.04c0-.66-.53-1.19-1.19-1.19s-1.19.53-1.19,1.19h0v8.04c.03.64.56,1.14,1.19,1.14"/>
                        <path class="cls-3_modal" d="m66.5,33.02c.66,0,1.19-.53,1.19-1.19v-8.77c0-.66-.54-1.2-1.2-1.2s-1.2.54-1.2,1.2v8.77c0,.66.53,1.19,1.19,1.19"/>
                        <path class="cls-3_modal" d="m66.5,79.45c.66,0,1.19-.53,1.19-1.19h0v-8.04c0-.66-.54-1.2-1.2-1.2s-1.2.54-1.2,1.2v8.04c0,.66.53,1.19,1.19,1.19,0,0,0,0,.01,0"/>
                        <path class="cls-3_modal" d="m66.5,79.45c.21,0,.42-.06.6-.16l7-4.04c.57-.33.77-1.06.44-1.64-.33-.57-1.06-.77-1.64-.44h0l-6.4,3.7-6.3-3.66c-.57-.33-1.31-.14-1.64.44s-.14,1.31.44,1.64l6.91,4c.18.11.39.16.6.16"/>
                        <path class="cls-3_modal" d="m66.5,51.83c.19,0,.37-.04.54-.12l6.97-4.02c.57-.33.77-1.06.44-1.64-.33-.57-1.06-.77-1.64-.44l-6.4,3.68-6.4-3.68c-.57-.33-1.31-.14-1.64.44s-.14,1.31.44,1.64h0l7.08,4.02c.18.11.39.16.6.16"/>
                        <path class="cls-3_modal" d="m49.61,42.05c.66.01,1.2-.52,1.21-1.18,0-.44-.23-.85-.62-1.06l-6.95-4.02c-.59-.3-1.31-.07-1.61.52-.28.54-.1,1.2.4,1.54l6.95,4.02c.18.1.39.16.6.16"/>
                        <path class="cls-3_modal" d="m42.65,38.03c.21,0,.42-.06.6-.16l6.97-4.02c.57-.33.77-1.06.44-1.64s-1.06-.77-1.64-.44h0l-6.97,4.02c-.58.32-.79,1.05-.47,1.62.21.39.62.62,1.06.62"/>
                        <path class="cls-3_modal" d="m83.42,42.05c.21,0,.42-.06.6-.16l6.97-4.04c.57-.33.77-1.06.44-1.64-.33-.57-1.06-.77-1.64-.44l-6.95,4.02c-.58.32-.79,1.05-.47,1.62.21.39.62.62,1.06.62"/><path class="cls-3_modal" d="m90.39,38.03c.66.01,1.2-.52,1.21-1.18,0-.44-.23-.85-.62-1.06l-6.95-4.01c-.57-.33-1.31-.13-1.64.44-.33.57-.13,1.31.44,1.64l6.95,3.99c.18.1.39.16.6.16"/>
                        <path class="cls-3_modal" d="m49.62,69.66c.66.01,1.2-.52,1.21-1.18,0-.44-.23-.85-.62-1.06l-6.98-3.97c-.57-.33-1.31-.13-1.64.44s-.13,1.31.44,1.64h0l6.98,3.97c.18.1.39.16.6.16"/>
                        <path class="cls-3_modal" d="m42.64,65.58c.21,0,.42-.06.6-.16l6.97-4.02c.57-.33.77-1.06.44-1.64-.33-.57-1.06-.77-1.64-.44h0l-6.97,4.13c-.58.32-.79,1.05-.47,1.62.21.39.62.62,1.06.62"/>
                        <path class="cls-3_modal" d="m83.42,69.66c.21,0,.42-.06.6-.16l6.97-4.02c.51-.42.57-1.18.15-1.68-.33-.39-.87-.53-1.35-.34l-6.95,4.02c-.58.32-.79,1.05-.47,1.62.21.39.62.62,1.06.62"/>
                        <path class="cls-3_modal" d="m90.39,65.58c.66.01,1.2-.52,1.21-1.18,0-.44-.23-.85-.62-1.06l-6.94-4.02c-.57-.33-1.31-.14-1.64.44-.33.57-.14,1.31.44,1.64l6.94,4.07c.18.1.39.16.6.16"/>
                
                        <text class="cls-2_modal" transform="translate(103.37 58.47)"><tspan x="0" y="0">VER EN TU ESPACIO</tspan></text>
                    </svg>

                    <div id="containerQR" class="containerQRMudi" style="background-color:${this.color}">
                        <img class="mudiQR" src="${this.dataServer.URL_QR}" >

                        <div class="containerText">
                            <div class="titleContainer">
                                <h4>ESCANÉAME PARA <br><b>VER EN TU ESPACIO</b></h4>
                                <hr class="hrTitle">
                            </div>

                            <div class="titleContainer">
                                <div class="iconTitle">
                                    <img class="stepMudi step1" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/amoblando@latest/assets/step3amoblando.webp">
                                </div>
                                <p class="textInfoMudi">Apunta el teléfono al piso.</p>
                            </div>

                            <div class="titleContainer">
                                <div class="iconTitle">
                                    <img class="stepMudi step2" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/amoblando@latest/assets/step4amoblando.webp">
                                </div>
                                <p class="textInfoMudi">Desplaza para visualizar.</p>
                            </div>

                            <div class="titleContainer">
                                <div class="iconTitle">
                                    <img class="stepMudi step3" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/amoblando@latest/assets/step2amoblando.webp">
                                </div>
                                <p class="textInfoMudi">Amplia y detalla el producto.</p>
                            </div>

                            <div class="titleContainer">
                                <div class="iconTitle">
                                    <img class="stepMudi step4" src="https://cdn.jsdelivr.net/gh/RodriguezJose92/amoblando@latest/assets/step1amoblando.webp">
                                </div>
                                <p class="textInfoMudi">Toca dos veces para restablecer.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `;

        /** We close the MUDI modal*/
        modalMudi.querySelector(`.closeModalMudi`).addEventListener('click',()=>{
            document.body.querySelector('#modalMudi').remove();
        });

        /** Init ARExperience */
        modalMudi.querySelector(`#imgARBtn`).addEventListener('click',()=>{

            if(window.innerWidth>1000){
                !flagAR 
                ? (
                    /** Event pixel Mudi */
                    mudiData.eventsMudiAR(),
                    document.body.querySelector('.containerQRMudi').style.right="15%",
                    changeStyleBtnAR(flagAR,this.color),
                    flagAR = !flagAR
                )
                : (
                    document.body.querySelector('.containerQRMudi').style.right="-150%",
                    changeStyleBtnAR(flagAR,this.color),
                    flagAR = !flagAR
                )
            }
            else {
                mudiData.eventsMudiAR();
                window.open(`${this.dataServer.URL_AR}`,"_BLANK");
            } 
            flagAR && this.sendEventInteraction('AR')
        });

        /** Verify Style Bttn AR  */
        function changeStyleBtnAR(flagAR,color){

            let icon = document.body.querySelectorAll('.cls-3_modal')

            flagAR
            ? (
                document.body.querySelector('.cls-1_modal').style.fill=color,
                icon.forEach((icon)=>icon.style.fill="white"),
                document.body.querySelector('.cls-2_modal').style.fill="white"
            ) 
            : (
                document.body.querySelector('.cls-1_modal').style.fill="white",
                icon.forEach((icon)=>icon.style.fill=color),
                document.body.querySelector('.cls-2_modal').style.fill=color
            )
        };

        document.body.appendChild(modalMudi)
    };

    /** create tooltip ✔️ */
    createTooltip(){
        const 
        tooltip = document.createElement('P');
        tooltip.classList.add('tooltipMudi');
        tooltip.setAttribute('style',`background-color:${this.color}`)
        tooltip.innerHTML=`<b>¡Nuevo!</b> Descubre como se ve este producto en 3D y realidad aumentada en tu espacio`;

        setTimeout(()=>{
            document.body.querySelector('.tooltipMudi').remove();
        },9000)

        return tooltip;
    };

    /** Send Evnt Interacción  ✔️ */
    sendEventInteraction(eventName){

        let OSdevice;

        if (navigator.userAgent.includes('Android')) OSdevice = 'Android';
        else if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) OSdevice = "IOS";
        else OSdevice = 'DESK';

        window.dataLayer && dataLayer.push({
            event: `Evento de interaccion ${eventName}`,
            valorMudi: 1,
            sku: this.skuNumber,
            category:this.category,
            subCategory: this.subCategory,
            sistemaOperativo: OSdevice
        })
    };

    /** viewer event Mudi GTM  */
    sendEventViewer(){
        let OSdevice;

        if (navigator.userAgent.includes('Android')) OSdevice = 'Android';
        else if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) OSdevice = "IOS";
        else OSdevice = 'DESK';

        window.dataLayer && dataLayer.push({
            event: `visualizacion_botones`,
            valorMudi: 1,
            sku: this.skuNumber,
            category: this.category,
            subCategory: this.subCategory,
            sistemaOperativo: OSdevice
        });

    };

    /** verifyExperience  ✔️ */
    async experienceOn(){

        /** mudiOut ExpeFailured */
        if(this.timeVerify>1000){
            console.log('outMudi')
            return;
        }

        let client = null;

        switch(location.hostname){
            case "mudi--lamarinamx.myvtex.com":
            case "www.lamarina.com.mx":
                client                      = 'marina';
                this.skuNumber              = document.body.querySelector('.vtex-product-identifier-0-x-product-identifier__value');
                this.color                  = "#006239";
                this.fatherContainer        = document.body.querySelector('.lamarinamx-marina-components-0-x-containerLayout--pdp-images__container');
                this.category               = document.body.querySelector("[data-testid='breadcrumb']");
                this.subCategory            = document.body.querySelector("[data-testid='breadcrumb']");
                this.addToCar               = document.body.querySelector('.vtex-add-to-cart-button-0-x-buttonText');
                break
            
            case "www.elbodegon.com.mx":
                client                      = 'bodegon'
                this.skuNumber              = document.body.querySelector('.skuReference')
                this.color                  = "#db0b14";
                this.fatherContainer        = document.body.querySelector('.product-page-images');
                this.category               = document.body.querySelectorAll('[itemprop="name"]');
                this.subCategory            = document.body.querySelectorAll('[itemprop="name"]');
                this.addToCar               = document.body.querySelector('[href="/checkout/cart/add?sku=1331422&qty=1&seller=1&redirect=true&sc=1"]')
                break;

        };

        /** verify Dom Elements */
        if( !this.skuNumber && !this.fatherContainer && !this.category && this.subCategory && !this.addToCar ){
            this.timeVerify ++
            requestAnimationFrame(this.experienceOn.bind(this));
        };
        
        this.skuNumber      = this.skuNumber.innerHTML;
        client == 'marina' ? (
            this.category       = this.category.childNodes[2].innerText ,
            this.subCategory    = this.subCategory.childNodes[3].innerText,
            this.addToCar       = this.addToCar.parentNode.parentNode.parentNode
        ) : (
            this.category       = this.category[2].innertext ,
            this.subCategory    = this.subCategory[3].innerText
        );        
        
        /** Response Mudi server */
        await this.conectServer(this.skuNumber);

        /** verify process */
        if (!this.dataServer){
            document.body.querySelector('.btnsMudiContainer') && document.body.querySelector('.btnsMudiContainer').remove();
            console.warn(`El sku: ${this.skuNumber} no posee experiencias de 3D  y AR`)
            return;
        }

        /** Create Styles */
        this.createStyles();
        /** Create Buttons */
        this.createBtns();

        /** get info PIXEL MUDI */
        this.flagTesting && mudiData.pixelOn(this.skuNumber);
        this.flagTesting && mudiData.eventView();
        this.flagTesting && mudiData.getCategory(this.category);
        this.flagTesting && mudiData.getSubCategory(this.subCategory);

        /** Viewer event GTM  */
        this.flagTesting && this.sendEventViewer();

        this.flagTesting = false;
        
    };

};

    const 
    mudiExperience = new MudiExperience();
    mudiExperience.experienceOn();
}else console.log('dobleRenderMudi')










