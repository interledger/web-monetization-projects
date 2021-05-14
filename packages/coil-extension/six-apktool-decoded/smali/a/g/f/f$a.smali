.class public La/g/f/f$a;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/g/f/f;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x9
    name = "a"
.end annotation


# instance fields
.field private final a:I

.field private final b:[La/g/f/f$b;


# direct methods
.method public constructor <init>(I[La/g/f/f$b;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput p1, p0, La/g/f/f$a;->a:I

    iput-object p2, p0, La/g/f/f$a;->b:[La/g/f/f$b;

    return-void
.end method


# virtual methods
.method public a()[La/g/f/f$b;
    .locals 1

    iget-object v0, p0, La/g/f/f$a;->b:[La/g/f/f$b;

    return-object v0
.end method

.method public b()I
    .locals 1

    iget v0, p0, La/g/f/f$a;->a:I

    return v0
.end method
