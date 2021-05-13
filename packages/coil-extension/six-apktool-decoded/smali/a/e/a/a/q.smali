.class public La/e/a/a/q;
.super La/e/a/a/r;
.source ""


# instance fields
.field c:F


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, La/e/a/a/r;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/q;->c:F

    return-void
.end method


# virtual methods
.method public a(I)V
    .locals 2

    iget v0, p0, La/e/a/a/r;->b:I

    if-eqz v0, :cond_0

    iget v0, p0, La/e/a/a/q;->c:F

    int-to-float v1, p1

    cmpl-float v0, v0, v1

    if-eqz v0, :cond_2

    :cond_0
    int-to-float p1, p1

    iput p1, p0, La/e/a/a/q;->c:F

    iget p1, p0, La/e/a/a/r;->b:I

    const/4 v0, 0x1

    if-ne p1, v0, :cond_1

    invoke-virtual {p0}, La/e/a/a/r;->b()V

    :cond_1
    invoke-virtual {p0}, La/e/a/a/r;->a()V

    :cond_2
    return-void
.end method

.method public d()V
    .locals 1

    invoke-super {p0}, La/e/a/a/r;->d()V

    const/4 v0, 0x0

    iput v0, p0, La/e/a/a/q;->c:F

    return-void
.end method

.method public f()V
    .locals 1

    const/4 v0, 0x2

    iput v0, p0, La/e/a/a/r;->b:I

    return-void
.end method
