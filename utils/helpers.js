module.exports = {
    // code copied from the University of Texas Code Bootcamp module 14 project
    format_date: dateObj => {
        return `${new Date(dateObj).getMonth() + 1}/${new Date(dateObj).getDate()}/${new Date(dateObj).getFullYear()}`;
    }
};