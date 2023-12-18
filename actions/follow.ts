'use server'

export const onFollow = (id: string) => {
    try {
        console.log("I'm the same as an API call", id)
    } catch (error) {
        throw new Error("Internal Error")
    }
}

