module.exports = {
    lookup:(from, localField, foreignField, as)=>{
        return {
            $lookup:{
                from: from,
                localField: localField,
                foreignField: foreignField,
                as: as
            }
        }
    },
    unwindEmptyArr:(path)=>{ // preserveNullAndEmptyArrays
        return { 
            $unwind: {
                path:"$"+path,
                preserveNullAndEmptyArrays :true 
            },
        }
    },
    facet:(start,limit,fieldName)=>{ // preserveNullAndEmptyArrays
        return {
            $facet: {
                [fieldName]: [{ $skip: start }, { $limit: limit }],
                totalCount: [
                    {
                        $count: 'count'
                    }
                ]
            }
        }
    },
}