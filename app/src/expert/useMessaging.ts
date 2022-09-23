import { Requests__factory } from '../contracts'
import {useMessaging} from '../useMessaging'




const useSendMessageOnOffer(offerId:string) {
    const messaging = useMessaging()
    const requests = Requests__factory.connect()
    return useCallback(
        async (to: string, message: string) => {
            const tx = await message.sendMessageTo
}