"use-strict";
const { DaoFactory } = require("uu_appg01_server").ObjectStore;


class CheckIdValid {
    daoMain;
    constructor(mainName) {
        this.daoMain = DaoFactory.getDao(mainName);
    }

    async checkIdValid(awid, inputArray) {
        let pageInfo = {};
        pageInfo.pageSize = 100;
        pageInfo.pageIndex = 0;

        let mainList = await this.daoMain.list(awid, "name", "asc", pageInfo);
        if (mainList.pageInfo.total > pageInfo.pageSize) {
            pageInfo.pageSize = mainList.pageInfo.total;
            mainList = await this.categoryDao.list(awid, "name", "asc", pageInfo);
        }

        let existingEntities = [];
        let invalidEntities = [];

        for (const file of inputArray) {
            let a = 0;
            if (mainList.itemList.filter(e => e.id.toJSON() === file.id).length > 0) {
                existingEntities.push(file);
            }
            else {
                invalidEntities.push(file);
            }
        }
        
        return {existingEntities, invalidEntities};
    }
}
module.exports = CheckIdValid;