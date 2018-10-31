class Book{

    constructor(imageUrl , title , author , id , shelf){

        this.imageUrl = ((imageUrl && imageUrl.thumbnail) || "");
        this.title = title;
        this.author = ((author && author[0]) || "");
        this.id = id;
        this.shelf = (shelf || "none");
    }



}

export default Book;