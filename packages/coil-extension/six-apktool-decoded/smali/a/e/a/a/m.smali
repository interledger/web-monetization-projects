.class public La/e/a/a/m;
.super La/e/a/a/h;
.source ""


# instance fields
.field protected va:[La/e/a/a/h;

.field protected wa:I


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, La/e/a/a/h;-><init>()V

    const/4 v0, 0x4

    new-array v0, v0, [La/e/a/a/h;

    iput-object v0, p0, La/e/a/a/m;->va:[La/e/a/a/h;

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/m;->wa:I

    return-void
.end method


# virtual methods
.method public J()V
    .locals 1

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/m;->wa:I

    return-void
.end method

.method public b(La/e/a/a/h;)V
    .locals 3

    iget v0, p0, La/e/a/a/m;->wa:I

    add-int/lit8 v0, v0, 0x1

    iget-object v1, p0, La/e/a/a/m;->va:[La/e/a/a/h;

    array-length v2, v1

    if-le v0, v2, :cond_0

    array-length v0, v1

    mul-int/lit8 v0, v0, 0x2

    invoke-static {v1, v0}, Ljava/util/Arrays;->copyOf([Ljava/lang/Object;I)[Ljava/lang/Object;

    move-result-object v0

    check-cast v0, [La/e/a/a/h;

    iput-object v0, p0, La/e/a/a/m;->va:[La/e/a/a/h;

    :cond_0
    iget-object v0, p0, La/e/a/a/m;->va:[La/e/a/a/h;

    iget v1, p0, La/e/a/a/m;->wa:I

    aput-object p1, v0, v1

    add-int/lit8 v1, v1, 0x1

    iput v1, p0, La/e/a/a/m;->wa:I

    return-void
.end method
