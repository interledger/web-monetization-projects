.class public La/g/f/f$b;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/g/f/f;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "b"
.end annotation


# instance fields
.field private final a:Landroid/net/Uri;

.field private final b:I

.field private final c:I

.field private final d:Z

.field private final e:I


# direct methods
.method public constructor <init>(Landroid/net/Uri;IIZI)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    invoke-static {p1}, La/g/h/g;->a(Ljava/lang/Object;)Ljava/lang/Object;

    check-cast p1, Landroid/net/Uri;

    iput-object p1, p0, La/g/f/f$b;->a:Landroid/net/Uri;

    iput p2, p0, La/g/f/f$b;->b:I

    iput p3, p0, La/g/f/f$b;->c:I

    iput-boolean p4, p0, La/g/f/f$b;->d:Z

    iput p5, p0, La/g/f/f$b;->e:I

    return-void
.end method


# virtual methods
.method public a()I
    .locals 1

    iget v0, p0, La/g/f/f$b;->e:I

    return v0
.end method

.method public b()I
    .locals 1

    iget v0, p0, La/g/f/f$b;->b:I

    return v0
.end method

.method public c()Landroid/net/Uri;
    .locals 1

    iget-object v0, p0, La/g/f/f$b;->a:Landroid/net/Uri;

    return-object v0
.end method

.method public d()I
    .locals 1

    iget v0, p0, La/g/f/f$b;->c:I

    return v0
.end method

.method public e()Z
    .locals 1

    iget-boolean v0, p0, La/g/f/f$b;->d:Z

    return v0
.end method
