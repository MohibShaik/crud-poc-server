module.exports = function (req) {
  return {
    pageIndex: req.query.pageIndex ? Number(req.query.pageIndex) : 0,
    pageSize: req.query.pageSize ? Number(req.query.pageSize) : 10,
  };
};
