import java.io.InputStream
import org.apache.http.HttpEntity
import org.apache.http.client.methods.CloseableHttpResponse
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.CloseableHttpClient
import org.apache.http.impl.client.HttpClients

def url = params.url

CloseableHttpClient httpClient = HttpClients.createDefault()
HttpGet request = new HttpGet(url)

try (CloseableHttpResponse res = httpClient.execute(request)) {
    HttpEntity entity = res.getEntity()
    if (entity != null) {
        InputStream inputStream = entity.getContent();
        response.contentType = 'image/png'
        response.outputStream << inputStream
        inputStream.close()
        response.flushBuffer()
    }
}