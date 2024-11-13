import java.net.URL
import java.io.InputStream

def url = params.url

def inputStream = new URL(url).openStream()

response.contentType = 'image/png'

response.outputStream << inputStream

inputStream.close()

response.flushBuffer()