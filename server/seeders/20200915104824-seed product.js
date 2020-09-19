'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return await queryInterface.bulkInsert('Products', [
    {
      name: "Haruki Murakami - 1Q84",
      image_url: "https://res.cloudinary.com/bookbub/image/upload/t_ci_ar_6:9_scaled,f_auto,q_auto,dpr_2,c_scale,w_405/v1591645252/pro_pbid_826858.jpg",
      price: 250000,
      stock: 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Donna Tartt - The Goldfinch",
      image_url: "https://images.booksense.com/images/444/055/9780316055444.jpg",
      price: 125000,
      stock: 20,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Toer, A.P - This Earth of Mankind",
      image_url: "https://kbimages1-a.akamaihd.net/61a718bc-907c-4e03-8661-58758421e901/353/569/90/False/this-earth-of-mankind-1.jpg",
      price: 150000,
      stock: 25,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "F. Scott Fitzgerald - The Great Gatsby",
      image_url: "https://i.pinimg.com/originals/3a/d6/0a/3ad60a056dd9b8874a61b7d95c3814fe.jpg",
      price: 150000,
      stock: 30,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Jane Austen - Pride & Prejudice",
      image_url: "https://prodimage.images-bn.com/pimages/9781499369748_p0_v2_s550x406.jpg",
      price: 400000,
      stock: 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Conan Doyle A. -  Sherlock Holmes",
      image_url: "https://m.media-amazon.com/images/I/41vMomStcUL.SX316.SY316.jpg",
      price: 200000,
      stock: 20,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Ralph Ellison - Invisible Man",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Invisible_Man_%281952_1st_ed_jacket_cover%29.jpg/440px-Invisible_Man_%281952_1st_ed_jacket_cover%29.jpg",
      price: 300000,
      stock: 15,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Adam Smith - The Wealth of Nations",
      image_url: "https://images.booksense.com/images/367/783/9780679783367.jpg",
      price: 150000,
      stock: 30,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Homer - The Odyssey",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/51FR8mSgqoL._SX346_BO1,204,203,200_.jpg",
      price: 150000,
      stock: 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Howard Pyle - Robin Hood",
      image_url: "https://kbimages1-a.akamaihd.net/8714f037-280b-4883-a384-9ab75329371e/353/569/90/False/the-merry-adventures-of-robin-hood-70.jpg",
      price: 90000,
      stock: 32,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Walter Isaacson - Steve Jobs",
      image_url: "https://everyday-reading.com/wp-content/uploads/2015/01/SteveJobsbyWalterIsaacson-1.jpg",
      price: 125000,
      stock: 23,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Harper Lee - To Kill A Mockingbird",
      image_url: "https://prodimage.images-bn.com/pimages/9780446310789_p0_v6_s550x406.jpg",
      price: 270000,
      stock: 123,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Ashlee Vance - Elon Musk",
      image_url: "https://kbimages1-a.akamaihd.net/127472e2-d76f-41da-9757-b594315cc924/353/569/90/False/elon-musk-inventing-the-future.jpg",
      price: 150000,
      stock: 30,
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
},

down: async (queryInterface, Sequelize) => {
  return await queryInterface.bulkDelete('Products', null, {})
}
};
