module.exports = {
    format_date: dateObj => {
        return `${new Date(dateObj).getMonth() + 1}/${new Date(dateObj).getDate()}/${new Date(dateObj).getFullYear()}`;
    }
};