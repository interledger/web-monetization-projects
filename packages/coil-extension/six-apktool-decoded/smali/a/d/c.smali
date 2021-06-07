.class La/d/c;
.super La/d/h;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/d/d;->a()La/d/h;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "La/d/h<",
        "TE;TE;>;"
    }
.end annotation


# instance fields
.field final synthetic d:La/d/d;


# direct methods
.method constructor <init>(La/d/d;)V
    .locals 0

    iput-object p1, p0, La/d/c;->d:La/d/d;

    invoke-direct {p0}, La/d/h;-><init>()V

    return-void
.end method


# virtual methods
.method protected a(Ljava/lang/Object;)I
    .locals 1

    iget-object v0, p0, La/d/c;->d:La/d/d;

    invoke-virtual {v0, p1}, La/d/d;->indexOf(Ljava/lang/Object;)I

    move-result p1

    return p1
.end method

.method protected a(II)Ljava/lang/Object;
    .locals 0

    iget-object p2, p0, La/d/c;->d:La/d/d;

    iget-object p2, p2, La/d/d;->h:[Ljava/lang/Object;

    aget-object p1, p2, p1

    return-object p1
.end method

.method protected a(ILjava/lang/Object;)Ljava/lang/Object;
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(ITE;)TE;"
        }
    .end annotation

    new-instance p1, Ljava/lang/UnsupportedOperationException;

    const-string p2, "not a map"

    invoke-direct {p1, p2}, Ljava/lang/UnsupportedOperationException;-><init>(Ljava/lang/String;)V

    throw p1
.end method

.method protected a()V
    .locals 1

    iget-object v0, p0, La/d/c;->d:La/d/d;

    invoke-virtual {v0}, La/d/d;->clear()V

    return-void
.end method

.method protected a(I)V
    .locals 1

    iget-object v0, p0, La/d/c;->d:La/d/d;

    invoke-virtual {v0, p1}, La/d/d;->b(I)Ljava/lang/Object;

    return-void
.end method

.method protected a(Ljava/lang/Object;Ljava/lang/Object;)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(TE;TE;)V"
        }
    .end annotation

    iget-object p2, p0, La/d/c;->d:La/d/d;

    invoke-virtual {p2, p1}, La/d/d;->add(Ljava/lang/Object;)Z

    return-void
.end method

.method protected b(Ljava/lang/Object;)I
    .locals 1

    iget-object v0, p0, La/d/c;->d:La/d/d;

    invoke-virtual {v0, p1}, La/d/d;->indexOf(Ljava/lang/Object;)I

    move-result p1

    return p1
.end method

.method protected b()Ljava/util/Map;
    .locals 2
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Ljava/util/Map<",
            "TE;TE;>;"
        }
    .end annotation

    new-instance v0, Ljava/lang/UnsupportedOperationException;

    const-string v1, "not a map"

    invoke-direct {v0, v1}, Ljava/lang/UnsupportedOperationException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method protected c()I
    .locals 1

    iget-object v0, p0, La/d/c;->d:La/d/d;

    iget v0, v0, La/d/d;->i:I

    return v0
.end method
