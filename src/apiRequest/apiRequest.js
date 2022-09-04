const apiRequest = async (url='', optionsObj=null, dataResponse, errMsg=null) => {
    try {
        const response = await fetch(url, optionsObj)

        if(!response.ok) throw Error('Did not receive expected API')

        dataResponse = await response.json()
        
    } catch (error) {
        errMsg = error.message
    } finally{
        return { dataResponse, errMsg }
    }
}

export default apiRequest