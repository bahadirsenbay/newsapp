import {action, observable, decorate} from 'mobx'
import Axios from 'axios';

class News {
    news = []
    visible = false
    saved = []
     getNews(categoryPath = 'technology'){
        Axios.get('https://newsapi.org/v2/top-headlines?country=tr&category=' + categoryPath + '&apiKey=50663fc6125e4bb7b58f140e0f08ad59')
        .then(res=>{
            this.news = res.data.articles
        })
     }

     showDrawer () {
        this.visible = !this.visible
    }

    handleValue = (e) => {
        let searchs = e.target.value;
        Axios.get('https://newsapi.org/v2/top-headlines?country=tr&q=' + searchs + '&apiKey=50663fc6125e4bb7b58f140e0f08ad59')
            .then(res => {
                this.news=res.data.articles
            })
    }

     handleForSave = (title, image) => {
        let newItem={ title,image }
        this.saved = [...this.saved, newItem]
    }
    
}
decorate(News, {
    //OBSORVABLES
    news: observable,
    visible:observable,
    saved: observable,
    //ACTIONS
    getNews:action,
    showDrawer:action,
    handleValue:action,
    handleForSave:action
  });
export const NewsStore = new News();
